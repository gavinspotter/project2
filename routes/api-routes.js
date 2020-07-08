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
  app.post('/api/user_data', (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
  // Route for saving recipe to db
  // needs to reference user who saved it
  app.post('/api/recipes', (req, res) => {
    // testing console so linter won't throw errors
    console.log(req, res);
    db.Recipe.create({});
  });
  // Route for saving shopping lists to db
  // needs to reference user who saved it
  // this will make sure that the current user's list is displayed.
  app.post('/api/shopping_lists', (req, res) => {
    // testing console so linter won't throw errors
    console.log(req, res);
    db.ShoppingList.create({});
  });
  // Route for getting user's saved recipes
  // user id will be determined by who is logged in
  app.get('/api/recipes/:user_id', (req, res) => {
    // testing console so linter won't throw errors
    console.log(req, res);
    db.Recipe.findAll({});
  });
  // Route for getting the user's current shopping list
  // user id will be determined by who is logged in.
  app.get('/api/shopping_lists/:user_id', (req, res) => {
    // testing console so linter won't throw errors
    console.log(req, res);
    db.ShoppingList.findAll({});
  });
  app.get('/api/recipes/search/:searchQuery', (req, res) => {
    console.log(req.params.searchQuery);
    res.json({
      msg: 'masdf',
    });
  });
};
