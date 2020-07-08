// api call for recipes instructions and ingredients =//
const apiKey = '2a60aadc108349cd8cf2e7ad1e59495a';

// get length of objects
const getInstructions = async (id) => {
    const res = await $.get(
        `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`,
    );
    console.log('getinstructions', res);

};

const getIngredients = async (id) => {
    const res = await $.get(
        `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`,
    );
    console.log('getingredients', res);

};

const getRecipes = async (query) => {
    const res = await $.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=5`,
    );
    res.results.forEach((result) => getInstructions(result.id));
    res.results.forEach((result) => getIngredients(result.id));

    // need: title, instructions, and the ingredients

    console.log("res.results", res.results);
};

$('#searchButton').on('click', () => {
    const searchQuery = $('.form-control').val();
    $.get(`/api/recipes/search/${searchQuery}`).then((res) => {
        console.log(res);
    });
    //getRecipes(searchQuery);// get all the data then do a promise 

});


// make a for loop for container length for the
// for loop would be for the recipes. get the length of rest
