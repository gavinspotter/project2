// create object that will contain current user data
let user = {};
// get's the logged in user's data
$.post('/api/user_data').then((res) => {
  // greets user
  $('.user-email').text(`Hello ${res.email}`);
  // sets user object to be used during search requests
  user = { id: res.id, email: res.email };
});
// function to dynamically create cards
const createCards = (title, imageSrc, id, description) => {
  //   // console.log(steps);
  const rowEl = $('<div>', {
    class: 'row card-row',
  });
  const cardEl = $('<div>', {
    class: 'card col-md-3 rounded',
  });
  const cardImgEl = $('<img>', {
    class: 'card-img result-images',
    src: imageSrc,
  });
  const saveBtnEl = $('<button>', {
    class: 'btn card-save-button btn-sm font-weight-bolder card-bottom save-recipe',
    'data-recipe-id': id,
    'data-recipe-title': title,
    'data-image': imageSrc,
  }).text('Save to Calendar');
  cardEl.append(cardImgEl, saveBtnEl);
  const textWrapperEl = $('<div>', {
    class: 'col-md-9 text-wrapper',
  });
  const titleEl = $('<h3>', {
    class: 'recipe-title',
  }).text(title);
  const descriptionEl = $('<p>', {
    class: 'description-text',
  }).html(description);
  textWrapperEl.append(titleEl, descriptionEl);
  rowEl.append(cardEl, textWrapperEl);
  $('.card-deck').append(rowEl);
};
// when clicked, will send query to back end and search for results
$('#searchButton').on('click', () => {
  const searchQuery = $('.form-control').val();
  // getRecipes(searchQuery);
  $.get(`/api/recipes/search/${searchQuery}`).then((results) => {
    console.log(results);
    $('.card-deck').empty();
    results.forEach((result) => {
      createCards(result.title, result.image, result.id, result.description);
    });
  });
});
// when clicked, will save the clicked recipe to the calendar and db
$(document.body).on('click', '.save-recipe', (e) => {
  // get recipe id and title from data attributes saved to the elements
  const id = e.target.getAttribute('data-recipe-id');
  const title = e.target.getAttribute('data-recipe-title');
  const imageSrc = e.target.getAttribute('data-image');
  console.log(id, title, user.id);
  $.post('/api/recipes', {
    title: title,
    recipeId: id,
    userId: user.id,
    image: imageSrc,
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
// make a for loop for container length for the
// for loop would be for the recipes. get the length of rest
