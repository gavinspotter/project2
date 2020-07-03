// api call for recipes instructions and ingredients =// 
const apiKey = `2a60aadc108349cd8cf2e7ad1e59495a`

const getRecipes = async () => {
    const query = "burger";
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

getRecipes();







