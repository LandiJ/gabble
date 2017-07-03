"use strict";
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define(
    "post",
    {
      body: {
        type: DataTypes.TEXT
      }
    },
    {}
  );

  post.associate = function(models) {
    post.belongsTo(models.user, { as: "author", foreignKey: "authorid" });
    post.hasMany(models.like, { as: "likes", foreignKey: "postid" });
  };
  return post;
};
