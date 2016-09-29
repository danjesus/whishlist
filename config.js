'use strict';

module.exports = () => {
  const ENV = process.env.NODE_ENV || 'development';

  return require(`./config.${ENV}.js`);
};
