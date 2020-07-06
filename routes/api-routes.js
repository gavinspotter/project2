
const passport = require('../config/passport');
const db = require('../models');

module.exports = (app) => {
// If the user has valid credentials, they'll be allowed to access restricted routes
  app.post('/api/index', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
  });
  // If the user is successfully created then log them in, otherwise, throw an error.
  app.post('/api/signup', (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, '/api/index');
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });
  // Route for logging a user out.
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  // Route for getting info about the user.
  app.get('/api/user_data', (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
};
