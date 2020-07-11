// Require bcrypt in order to salt hash user passwords
const bcrypt = require('bcryptjs');
// Wrap user model in module.exports
module.exports = function (sequelize, DataTypes) {
  // Add email and password columns to User table.
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Post, {
      onDelete: 'cascade',
    });
  };
  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      onDelete: 'cascade',
    });
  };
  // Method will check if password entered by user
  //   can be compared to hashed password in database.
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Automatic method that will hash a users password before their account is created.
  User.addHook('beforeCreate', (user) => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
<<<<<<< HEAD
      null
=======
      null,
>>>>>>> 386573f15f6355f824cb3cd51e102a7e025974bd
    );
  });
  return User;
};
