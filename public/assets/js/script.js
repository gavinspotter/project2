// api call for recipes instructions and ingredients =//

// let user = {};

// const createCards = (title, recipe, id) => {
//   const cardEl = $('<div>', {
//     class: 'card',
//   }).data('id', id);
//   const cardBodyEl = $('<div>', {
//     class: 'card-body',
//   });
//   const cardTitleEl = $('<h5>', {
//     class: 'card-title',
//   }).text(title);
//   const cardTextEl = $('<div>', {
//     class: 'card-text',
//   }).text(recipe);
//   cardBodyEl.append(cardTitleEl);
//   cardBodyEl.append(cardTextEl);
//   cardEl.append(cardBodyEl);
//   $('.col-md-9').append(cardEl);
// };
// get length of objects
// const getInstructions = async (id) => {
//   const res = await $.get(
//     `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`,
//   );
//   console.log('getinstructions', res);
// };

// const getIngredients = async (id) => {
//   const res = await $.get(
//     `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`,
//   );
//   console.log('getingredients', res);
//   res.ingredients.forEach((ingredient) => {
//     createCards(ingredient.name, ingredient.amount.us.value, id);
//     console.log(id);
//   });
// };

// const getRecipes = async (query) => {
//   const res = await $.get(
//     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&includeIngredients&number=1`,
//   );
//   // res.results.forEach((result) => getInstructions(result.id));
//   // res.results.forEach((result) => getIngredients(result.id));
//   console.log(res);
// };

$('#searchButton').on('click', () => {
  const searchQuery = $('.form-control').val();
  // getRecipes(searchQuery);
  $.get(`/api/recipes/search/${searchQuery}`).then((res) => {
    console.log(res);
  });
});

// get's the logged in user's data
$.post('/api/user_data').then((res) => {
  // greets user
  $('.user-email').text(`Hello ${res.email}`);
  // sets user object to be used during search requests
  // user = { id: res.id, email: res.email };
});

// make a for loop for container length for the
// for loop would be for the recipes. get the length of rest
