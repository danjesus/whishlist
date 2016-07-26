import logger from './lib/logger';

module.exports = {
  secret: '9080982%#@&^',
  jwtSession: { session: false },
  database: 'whishlist',
  username: 'danjesus',
  password: null,
  host: '127.0.0.1',
  params: {
    dialect: 'postgres',
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: {
      underscored: true
    }
  },
  port: 3000
};