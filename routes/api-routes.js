const router = require('express').Router();
const passport = require('../config/passport');
const db = require('../models');

// If the user has valid credentials, they'll be allowed to access restricted routes
router.post('/api/index', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});
// If the user is successfully created then log them in, otherwise, throw an error.
router.post('/api/signup', (req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => {
      res.redirect(307, '/api/signup');
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});
// Route for logging a user out.
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
// Route for getting info about the user.
router.get('/api/user_data', (req, res) => {
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
router.post('/api/recipes', (req, res) => {
  db.Recipe.create({});
});
// Route for saving shopping lists to db
// needs to reference user who saved it
// this will make sure that the current user's list is displayed.
router.post('/api/shopping_lists', (req, res) => {
  db.ShoppingList.create({});
});
// Route for getting user's saved recipes
// user id will be determined by who is logged in
router.get('/api/recipes/:user_id', (req, res) => {
  db.Recipe.findAll({});
});
// Route for getting the user's current shopping list
// user id will be determined by who is logged in.
router.get('/api/shopping_lists/:user_id', (req, res) => {
  db.ShoppingList.findAll({});
});

module.exports = router;
