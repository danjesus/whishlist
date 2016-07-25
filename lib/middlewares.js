'use strict';

import morgan from 'morgan';
import logger from './logger';
import bodyParser from 'body-parser';
import auth from './authentication';

module.exports = app => {
  const ENV = process.env.NODE_ENV || "development";
  let config = app.config[ENV];
  let port = process.env.PORT || config.port;

  app.set('port', port);
  app.set('env', ENV);
  app.set('jwtSecret', config.secret);
  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(bodyParser.json());

  app.use(morgan("common", {
    stream: {
      write: message => {
        logger.info(message);
      }
    }
  }));

  app.get('/', (req, res) => {
    res
      .status(200)
      .json({
        status: 'Whishlist API ready'
      });
  });

  app.use('/api', auth);
};
