const config = require(`./config.${process.env.NODE_ENV || 'development'}.js`);

module.exports = () => config;
