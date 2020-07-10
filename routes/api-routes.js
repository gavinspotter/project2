const passport = require('../config/passport');
const db = require('../models');
const axios = require('axios');
require("dotenv").config();


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
    const query = req.params.searchQuery;
    // call getRecipes to the food api
    getRecipes(query);
  });
};

const getIngredients = async (id) => {
  const res = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${process.env.apiKey}`
  );
  console.log('getingredients', res.data);
};
const getInstructions = async (id) => {
  const res = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.apiKey}`
  );
  console.log(`instructions`, res.data);
};
const getRecipes = async (query) => {
  const res = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}&query=${query}&includeIngredients&number=1`
  );
  res.data.results.forEach((result) => {
    getInstructions(result.id);
  });
  res.data.results.forEach((result) => getIngredients(result.id));
};
