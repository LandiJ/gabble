"use strict";
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      bio: {
        type: DataTypes.TEXT
      }
    },
    {}
  );
  user.associate = function(models) {
    user.hasMany(models.post, { as: "posts", foreignKey: "authorid" });
  };
  return user;
};
