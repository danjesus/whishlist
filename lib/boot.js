/* eslint no-console: ["error", { allow: ["log", "error"] }] */
module.exports = app => {
  const port = app.get('port');

  if (process.env.NODE_ENV !== 'test') {
    app.db.sequelize.sync().done(() => {
      app.listen(port, () => {
        console.log('Whishlist API - ready on %d', port);
      });
    });
  }
};
