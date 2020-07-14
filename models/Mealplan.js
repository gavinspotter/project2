module.exports = (sequelize, DataTypes) => {
  const Mealplan = sequelize.define('Mealplan', {
    // each plan created will have a relation to the user that
    // created it by their id
    monday: {
      type: DataTypes.STRING,
    },
    tuesday: {
      type: DataTypes.STRING,
    },
    wednesday: {
      type: DataTypes.STRING,
    },
    thursday: {
      type: DataTypes.STRING,
    },
    friday: {
      type: DataTypes.STRING,
    },
    saturday: {
      type: DataTypes.STRING,
    },
    sunday: {
      type: DataTypes.STRING,
    },
  });
  // create a relation to the user who created the mealplan
  Mealplan.associate = (models) => {
    Mealplan.belongsTo(models.User);
  };
  return Mealplan;
};
