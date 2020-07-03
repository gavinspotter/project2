module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    // each post created will have a relation to the user that
    // created it by their id
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  // create a relation to the user who created the post
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Post;
};
