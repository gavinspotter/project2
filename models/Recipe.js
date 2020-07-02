module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      // allow users to save recipes
      // this will be used to display back to them
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
  });
  // create a relation to the user who saved the recipe
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Recipe;
};
