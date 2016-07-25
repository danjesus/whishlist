'use strict';
import PasswordFactory from '../lib/password.factory';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      full_address: DataTypes.JSON
    },
    {
      hooks: {
        beforeCreate: user => {
          user.password = PasswordFactory.create(user.password)
        }
      },
      classMethods: {
        associate: function (models) {

        },
        isPassword: (encodedPassword, password) => {
          return PasswordFactory.compare(password, encodedPassword);
        }
      }
    });
  return User;
};