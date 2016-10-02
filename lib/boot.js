import logger from './logger';

module.exports = app => {
  const port = app.get('port');

  if (process.env.NODE_ENV !== 'test') {
    app.db.sequelize.sync().done(() => {
      app.listen(port, () => {
        logger.debug(`Whishlist API - ready on ${port}`);
      });
    });
  }
};
