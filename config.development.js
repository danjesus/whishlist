import logger from './lib/logger';

var dbHost = process.env.DB_HOST || '127.0.0.1';

module.exports = {
  secret: '9080982%#@&^',
  jwtSession: { session: false },
  database: 'whishlist',
  username: 'danjesus',
  password: null,
  params: {
    host: dbHost,
    dialect: 'postgres',
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: {
      underscored: true,
    },
  },
  port: 3000,
};
