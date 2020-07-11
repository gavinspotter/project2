module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // user will have a username, can't be null, must not be a duplicate
    // and must be between 1 and 20 characters
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 20],
      },
      // user must have a password as well
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  // associate the added user to their posts and saved recipes
  User.associate = (models) => {
    User.hasMany(models.Post, {
      // if the user is deleted, their posts will be deleted as well
      onDelete: 'cascade',
    });
  };
  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      // if the user is deleted, their recipes will be deleted as well
      onDelete: 'cascade',
    });
  };
  return User;
};
