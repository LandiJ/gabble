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
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return user;
};
