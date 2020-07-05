// api call for recipes instructions and ingredients =// 
const apiKey = `2a60aadc108349cd8cf2e7ad1e59495a`

const getRecipes = async (query) => {/// get the lenth of this return. write a for each loop that will create cards 
    const res = await $.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`
    );
    res.results.forEach(async result => await getInstructions(result.id));
    res.results.forEach(async result => await getIngredients(result.id));
};

const getInstructions = async id => {
    const res = await $.get(
        `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`
    );
    console.log(res);
};

const getIngredients = async id => {
    const res = await $.get(
        `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`
    );
    console.log(res);
};
$("#searchButton").on("click", function () {
    const searchQuery = $(".form-control").val();
    getRecipes(searchQuery);
})



// make a for loop for container length for the for loop would be for the recipes. get the length of rest 
