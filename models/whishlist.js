module.exports = function (sequelize, DataTypes) {
  const Whishlist = sequelize.define('Whishlist', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    average_value: DataTypes.DECIMAL,
  }, {
    classMethods: {
      associate(models) {
        Whishlist.belongsTo(models.User);
      },
    },
  });
  return Whishlist;
};
