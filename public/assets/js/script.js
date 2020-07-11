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
const createCards = (title, imageSrc, description, id) => {
  const cardEl = $('<div>', {
    class: 'card col-md-4 rounded',
  });
  const cardHeaderEl = $('<div>', {
    class: 'card-header text-center font-weight-bold',
  }).text(title);
  const cardImgEl = $('<img>', {
    class: 'card-img result-images',
    src: imageSrc,
  });
  const cardBodyEl = $('<div>', {
    class: 'card-body py-2',
  });
  const cardParaEl = $('<p>', {
    class: 'card-text recipe-description',
  }).html(description);

  const saveBtnEl = $('<button>', {
    class: 'btn btn-sm font-weight-bolder card-bottom save-recipe',
    'data-recipe-id': id,
    'data-recipe-title': title,
  }).text('Save to Calendar');
  cardBodyEl.append(cardParaEl, saveBtnEl);
  cardEl.append(cardHeaderEl, cardImgEl, cardBodyEl);
  $('.test-row').append(cardEl);
};

// when clicked, will send query to back end and search for results
$('#searchButton').on('click', () => {
  const searchQuery = $('.form-control').val();
  // getRecipes(searchQuery);
  $.get(`/api/recipes/search/${searchQuery}`).then((results) => {
    console.log(results);
    $('.test-row').empty();
    results.forEach((result) => {
      createCards(result.title, result.image, result.description, result.id);
    });
  });
});

// when clicked, will save the clicked recipe to the calendar and db
$(document.body).on('click', '.save-recipe', (e) => {
  // get recipe id and title from data attributes saved to the elements
  const id = e.target.getAttribute('data-recipe-id');
  const title = e.target.getAttribute('data-recipe-title');
  console.log(id);
  $.post('/api/recipes', {
    title: title,
    recipeId: id,
    userId: user.id,
  })
    .then(() => {
      // alert('saved');
    })
    .catch((err) => {
      console.log(err);
    });
});

// make a for loop for container length for the
// for loop would be for the recipes. get the length of rest
