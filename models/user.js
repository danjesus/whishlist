import PasswordFactory from '../lib/password.factory';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      full_address: DataTypes.JSON,
    },
    {
      hooks: {
        beforeCreate: user => {
          const newUser = user;

          newUser.password = PasswordFactory.create(newUser.password);
        },
      },
      classMethods: {
        associate(models) {
          User.hasMany(models.Whishlist);
        },
        isPassword: (encPass, pass) => PasswordFactory.compare(pass, encPass),
      },
    });

  return User;
};
