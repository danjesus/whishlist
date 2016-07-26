module.exports = {
  development : {
    secret: '9080982%#@&^',
    database: 'whishlist',
    username: 'danjesus',
    password: null,
    host: '127.0.0.1',
    params: {
      dialect: 'postgres',
      logging: false,
      define: {
        underscored: true
      }
    },
    port: 3000
  }
};
