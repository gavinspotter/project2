// call for user id when the page loads
// create object that will contain current user data
let user = {};
// function for creating cards
const createCards = (title, day, id) => {
  const cardEl = $('<div>', {
    style: 'width: 18rem;',
    class: 'card',
  });
  const cardBodyEl = $('<div>', {
    class: 'card-body',
  });
  const cardTitleEl = $('<h5>', {
    class: 'card-title',
  }).text(title);
  const saveBtnEl = $('<button>', {
    class: 'btn btn-primary add-btn',
    'data-recipe-id': id,
    'data-recipe-title': title,
    'data-saved-day': day,
  }).text('Add to Meal Plan');
  cardBodyEl.append(cardTitleEl, saveBtnEl);
  cardEl.append(cardBodyEl);
  $('.test-recipes').append(cardEl);
};
const createList = (item, id, userId) => {
  // create new li for item
  const liEl = $('<li>', {
    class: 'list-group-item',
  }).text(item);
  const buttonEl = $('<button>', {
    class: 'btn btn-primary remove-item-btn',
    'data-id': id,
    'data-userId': userId,
  }).text('Remove');
  // append the button to the li
  liEl.append(buttonEl);
  // append the li to the ul element on the page
  $('.test-list-ul').append(liEl);
};
const getList = (userData) => {
  $.get(`/api/shopping_lists/${userData.id}`).then((results) => {
    // $('.test-list-el').empty;
    results.forEach((result) => {
      // console.log(result.name);
      createList(result.name, result.id, userData.id);
    });
  });
};
const getRecipes = (userData) => {
  // get request to /api/recipes/:userId for recipe saved recipe info
  $.get(`/api/recipes/${userData.id}`).then((results) => {
    // console.log(results);
    // with the returned info, create dom elements to display the info
    // populate saved page with list of recipes
    // that are saved to the db for the current user
    results.forEach((result) => {
      createCards(result.name, result.pickedDay, result.recipeId);
    });
  });
};
// this handles populating the shopping list with recipe ingredients
// get's the logged in user's data
const pageLoad = async () => {
  await $.post('/api/user_data').then((results) => {
    // sets user object to be used during search requests
    user = { id: results.id, email: results.email };
    // console.log(user);
  });
  $('.test-recipes').empty();
  $('.test-list-ul').empty();
  getRecipes(user);
  // api get request to /api/shopping-list/:userId
  getList(user);
};

// each recipe will have an option on it to add to the week's meal plan
// if it is added to the meal plan,
// then it is added to the user's shopping list

// click event for add to meal plans to update the day's
$(document.body).on('click', '.add-btn', (e) => {
  const recipeId = e.target.getAttribute('data-recipe-id');
  // api post request to /api/shopping-list/:userId/:recipeId
  $.post(`/api/shopping_lists/${user.id}/${recipeId}`, {
    userId: user.id,
    recipeId: recipeId,
  }).then((results) => {
    console.log(results);
    pageLoad();
  });
  // this request handles saving the recipe ingredients to the shopping list
  // api put request to update recipe day
});

// set up delete route when remove button is clicked
// deletes single item from list
$(document.body).on('click', '.remove-item-btn', (e) => {
  const id = e.target.getAttribute('data-id');
  $.ajax({
    url: `/api/shopping_lists/${user.id}/${id}`,
    type: 'DELETE',
  }).then(() => {
    console.log('success');
    pageLoad();
  });
});

// button to clear the shopping list, removes list items from db
$('.delete-list').on('click', () => {
  console.log('clicked');
  $.ajax({
    url: `/api/shopping_lists/${user.id}`,
    type: 'DELETE',
  }).then(() => {
    console.log('success');
    pageLoad();
  });
});

pageLoad();
