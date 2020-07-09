const axios = require('axios');
const passport = require('../config/passport');
const db = require('../models');
require('dotenv').config();

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
    console.log(req.body);
    db.Recipe.create({
      name: req.body.title,
      recipeId: req.body.recipeId,
      UserId: req.body.userId,
    })
      .then(() => {
        res.status(200).json({ message: 'Recipe added' });
      })
      .catch((err) => {
        res.status(404).json(err);
      });
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
  app.get('/api/recipes/:userId', (req, res) => {
    // testing console so linter won't throw errors
    console.log(req, res);
    db.Recipe.findAll({
      where: {
        UserId: req.params.userId,
      },
    }).then((results) => {
      res.status(200).json(results);
    });
  });
  // Route for getting the user's current shopping list
  // user id will be determined by who is logged in.
  app.get('/api/shopping_lists/:userId', (req, res) => {
    // testing console so linter won't throw errors
    console.log(req, res);
    db.ShoppingList.findAll({});
  });
  app.get('/api/recipes/search/:searchQuery', (req, res) => {
    const query = req.params.searchQuery;
    // call getRecipes to the food api
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}&includeIngredients=${query}&addRecipeInformation=true&number=5&instructionsRequired=true`,
      )
      .then((results) => {
        // set up an empty array to push the data into
        const recipesArray = [];
        // get recipe data from api call
        const recipes = results.data.results;
        recipes.forEach((recipe) => {
          // push each recipe's id, title, and instructions to the array as an object
          recipesArray.push({
            id: recipe.id,
            title: recipe.title,
            instructions: recipe.analyzedInstructions,
            image: recipe.image,
          });
        });
        // send the array to the front end
        res.json(recipesArray);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};

// const getIngredients = async (id) => {
//   const results = await axios.get(
//     `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${process.env.apiKey}`
//   );
//   return results.data;
//   // console.log('getingredients', result.data);
// };

// const getInstructions = async (id) => {
//   const results = await axios.get(
//     `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.apiKey}`
//   );
//   return results.data;
// };
// const getRecipes = async (query) => {
//   const results = await axios.get(
//     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.apiKey}&query=${query}&includeIngredients&number=1`
//   );
//   results.data.results.forEach((result) => {
//     getInstructions(result.id);
//     getIngredients(result.id);
//   });
//   // result.data.results.forEach((result) => {

//   // });
// };
