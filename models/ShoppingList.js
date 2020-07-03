module.exports = (sequelize, DataTypes) => {
  const ShoppingList = sequelize.define('ShoppingList', {
    // this data handle's the user's shopping list.
    // it'll take the name of the item's from the recipe the user is saving
    // and grab the price of the item from the spoonacular api to save to our db
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  // create a relation to the user who created the post
  ShoppingList.associate = (models) => {
    ShoppingList.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return ShoppingList;
};
