'use strict';

module.exports = app => {
  const ENV = process.env.NODE_ENV;

  if (ENV) {
    return require(`./config.${ENV}.js`);
  }

  return require('./config.development.js');
};
