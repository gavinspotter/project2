// api call for recipes instructions and ingredients =//

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
    class: 'btn btn-primary',
    'data-recipe-id': id,
  }).text('Save to Calendar');
  cardBodyEl.append(cardImgEl, cardTitleEl, saveBtnEl);
  cardEl.append(cardBodyEl);
  $('.col-md-9').append(cardEl);
};

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

// get's the logged in user's data
$.post('/api/user_data').then((res) => {
  // greets user
  $('.user-email').text(`Hello ${res.email}`);
  // sets user object to be used during search requests
  // user = { id: res.id, email: res.email };
});

// make a for loop for container length for the
// for loop would be for the recipes. get the length of rest
