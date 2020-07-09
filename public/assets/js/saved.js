// call for user id when the page loads
// create object that will contain current user data
let user = {};
// get's the logged in user's data
const pageLoad = async () => {
  await $.post('/api/user_data').then((res) => {
    // sets user object to be used during search requests
    user = { id: res.id, email: res.email };
    console.log(user);
  });
  $.get(`/api/recipes/${user.id}`).then((results) => {
    console.log(results);
    // with the returned info, create dom elements to display the info
  });
};
pageLoad();

// populate saved page with list of recipes
// that are saved to the db for the current user
// get request to /api/recipes/:userId for recipe saved recipe info

// each recipe will have an option on it to add to the week's meal plan

// if it is added to the meal plan,
// then it is added to the user's shopping list

// api post request to /api/shopping-list/:userId
// this request handles saving the recipe ingredients to the shopping list
