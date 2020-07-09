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
const createCards = (title, imageSrc, id) => {
  const cardEl = $('<div>', {
    style: 'width: 18rem;',
    class: 'card',
  });
  const cardBodyEl = $('<div>', {
    class: 'card-body',
  });
  const cardImgEl = $('<img>', {
    class: 'card-img-top',
    src: imageSrc,
  });
  const cardTitleEl = $('<h5>', {
    class: 'card-title',
  }).text(title);
  const saveBtnEl = $('<button>', {
    class: 'btn btn-primary calendar-save',
    'data-recipe-id': id,
    'data-recipe-title': title,
  }).text('Save to Calendar');
  cardBodyEl.append(cardImgEl, cardTitleEl, saveBtnEl);
  cardEl.append(cardBodyEl);
  $('.col-md-9').append(cardEl);
};

// when clicked, will send query to back end and search for results
$('#searchButton').on('click', () => {
  const searchQuery = $('.form-control').val();
  // getRecipes(searchQuery);
  $.get(`/api/recipes/search/${searchQuery}`).then((results) => {
    console.log(results);
    results.forEach((result) => {
      createCards(result.title, result.image, result.id);
    });
  });
});

// when clicked, will save the clicked recipe to the calendar and db
$(document.body).on('click', '.calendar-save', (e) => {
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
