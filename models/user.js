'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    full_address: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return User;
};