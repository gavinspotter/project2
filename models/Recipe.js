module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      // allow users to save recipes
      // this data will be used to display back to them
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    pickedDay: {
      type: DataTypes.STRING,
    },
  });
  // create a relation to the user who saved the recipe
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Recipe;
};
