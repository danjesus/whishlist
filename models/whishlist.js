'use strict';

module.exports = function(sequelize, DataTypes) {
  var Whishlist = sequelize.define('Whishlist', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    average_value: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        Whishlist.belongsTo(models.User);
      }
    }
  });
  return Whishlist;
};
