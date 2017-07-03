"use strict";
module.exports = function(sequelize, DataTypes) {
  var like = sequelize.define("like", {}, {});
  like.associate = function(models) {
    like.belongsTo(models.post, { as: "post", foreignKey: "postid" });
    like.belongsTo(models.user, { as: "author", foreignKey: "authorid" });
  };

  return like;
};
