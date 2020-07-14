// call for user id when the page loads
// create object that will contain current user data
let user = {};
let selectedDay;
// function for creating cards
// const createCards = (title, day, id) => {
//   const cardEl = $('<div>', {
//     style: 'width: 18rem;',
//     class: 'card',
//   });
//   const cardBodyEl = $('<div>', {
//     class: 'card-body',
//   });
//   const cardTitleEl = $('<h5>', {
//     class: 'card-title',
//   }).text(title);
//   const saveBtnEl = $('<button>', {
//     class: 'btn btn-primary add-btn',
//     'data-recipe-id': id,
//     'data-recipe-title': title,
//     'data-saved-day': day,
//   }).text('Add to Meal Plan');
//   cardBodyEl.append(cardTitleEl, saveBtnEl);
//   cardEl.append(cardBodyEl);
//   $('.test-recipes').append(cardEl);
// };
const createRecipeList = (recipe, recipeId, userId) => {
  // create new li for item
  const trEl = $('<tr>', {
    scope: 'row',
  });
  const tdTitleEl = $('<td>').text(recipe);
  const tdButtonEl = $('<td>');
  const buttonEl = $('<button>', {
    class: 'delete-recipe',
    'data-recipe-id': recipeId,
    'data-userId': userId,
  }).text('Delete');
  tdButtonEl.append(buttonEl);
  trEl.append(tdTitleEl, tdButtonEl);
  // append the button to the li
  // append the li to the ul element on the page
  $('.saved-recipe-list').append(trEl);
};
const createSelectRecipeList = (recipe, recipeId, userId) => {
  const buttonEl = $('<button>', {
    class: 'list-group-item list-group-item-action select-this-button',
    'data-recipe-id': recipeId,
    'data-user-id': userId,
  }).text(recipe);
  $('.weekday-recipes').append(buttonEl);
};
const getRecipes = (userData) => {
  $('.saved-recipe-list').empty();
  $('.weekday-recipes').empty();
  // get request to /api/recipes/:userId for recipe saved recipe info
  $.get(`/api/recipes/${userData.id}`)
    .then((results) => {
      console.log('recipes', results);
      // with the returned info, create dom elements to display the info
      // populate saved page with list of recipes
      // that are saved to the db for the current user
      results.forEach((result) => {
        createRecipeList(result.name, result.recipeId, result.UserId);
        createSelectRecipeList(result.name, result.recipeId, result.UserId);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// this handles getting data about specific recipes
// steps, ingredients, etc
// will display when clicked on
// uses data attribute on view buttons with updated recipe id
const getSingleRecipeInfo = (recipeId) => {
  $.get(`/api/recipes/searchById/${recipeId}`)
    .then((results) => {
      // returns title, ingredients, and instructions
      console.log(results);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getMealCardInfo = (recipeId, day) => {
  $.get(`/api/recipes/searchById/${recipeId}`)
    .then((results) => {
      // returns title, ingredients, and instructions
      console.log(day, results);
      // clear out the lists prior to appending new info
      $(`#${day}FoodList`).empty();
      $(`#${day}RecipeList`).empty();
      // sets that day's title to the saved meal for that day
      $(`#${day}Title`).text(results.title);
      // sets the image src to the saved recipes result for that day
      $(`#${day}Image`).attr('src', results.image);
      // loops over the array of results and creates lists for ingredients
      results.ingredients.forEach((ingredient) => {
        const liEl = $('<li>', {
          class: 'list item',
        }).text(ingredient.name);
        $(`#${day}FoodList`).append(liEl);
      });
      // loops over the array of results and creates lists for the instructions
      results.instructions.forEach((step) => {
        const liEl = $('<li>', {
          class: 'list-item',
        }).text(step.step);
        $(`#${day}RecipeList`).append(liEl);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// this handles populating the shopping list with recipe ingredients
// gets the logged in user's data
const pageLoad = async () => {
  await $.post('/api/user_data').then((results) => {
    // sets user object to be used during search requests
    user = { id: results.id, email: results.email };
    // console.log(user);
  });

  getRecipes(user);
  getMealPlan(user);
  // api get request to /api/shopping-list/:userId
  // getList(user);
};
// function to get the user's saved mealplan data
const getMealPlan = (user) => {
  $.get(`/api/mealplan/${user.id}`).then((results) => {
    console.log(results);
    getMealCardInfo(results[0].monday, 'monday');
    getMealCardInfo(results[1].tuesday, 'tuesday');
    getMealCardInfo(results[2].wednesday, 'wednesday');
    getMealCardInfo(results[3].thursday, 'thursday');
    getMealCardInfo(results[4].friday, 'friday');
    getMealCardInfo(results[5].saturday, 'saturday');
    getMealCardInfo(results[6].sunday, 'sunday');
  });
};

// each recipe will have an option on it to add to the week's meal plan
// if it is added to the meal plan,
// then it is added to the user's shopping list
$('.view-recipe').on('click', (e) => {
  const recipeId = e.target.getAttribute('data-recipe-id');
  console.log(recipeId);
  getSingleRecipeInfo(recipeId);
});
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
// click event that opens modal with saved recipes
$('#savedRecipeButton').on('click', () => {
  getRecipes(user);
});
// listener to handle updating
$('.select-day').on('click', (e) => {
  selectedDay = e.target.getAttribute('data-select');
  console.log(selectedDay);
});
$(document.body).on('click', '.select-this-button', (e) => {
  const recipeId = e.target.getAttribute('data-recipe-id');
  const userId = e.target.getAttribute('data-user-id');
  console.log(selectedDay, recipeId, userId);
  $.ajax({
    url: `/api/mealplan/${selectedDay}/${recipeId}/${userId}`,
    type: 'PUT',
  }).then((results) => {
    console.log(results);
    pageLoad();
  });
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

$(document.body).on('click', '.delete-recipe', (e) => {
  const id = e.target.getAttribute('data-recipe-id');
  const userId = e.target.getAttribute('data-userid');
  $.ajax({
    url: `/api/recipes/${userId}/${id}`,
    type: 'DELETE',
  })
    .then(() => {
      console.log('deleted');
      getRecipes(user);
    })
    .catch((err) => {
      console.log(err);
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

// Mike wrote this
// when clicked will update saved recipe list

// $("#savedRecipeButton").on("click", () => {
//   $(document).on('show.bs.modal', '#savedRecipeModal', () => {

//   })
//     const showRecipe = $("<li class='list-group-item'>").text();
// })

pageLoad();
