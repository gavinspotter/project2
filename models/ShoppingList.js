module.exports = (sequelize, DataTypes) => {
  const ShoppingList = sequelize.define('ShoppingList', {
    // this data handle's the user's shopping list.
    // it'll take the name of the item's from the recipe the user is saving
    // and grab the price of the item from the spoonacular api to save to our db
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  // create a relation to the user who created the post
  // ShoppingList.associate = (models) => {
  //   ShoppingList.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };
  ShoppingList.associate = (models) => {
    ShoppingList.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return ShoppingList;
};
