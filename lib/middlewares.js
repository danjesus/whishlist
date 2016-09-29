import morgan from 'morgan';
import bodyParser from 'body-parser';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import logger from './logger';

module.exports = app => {
  const ENV = process.env.NODE_ENV || 'development';
  const config = app.config;
  const port = process.env.PORT || config.port;

  app.set('port', port);
  app.set('env', ENV);
  app.set('jwtSecret', config.secret);
  app.use(morgan('dev'));

  app.use(compression());

  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  app.use(cors());

  app.use(helmet());

  app.use(bodyParser.json());

  app.use(morgan('common', {
    stream: {
      write: message => {
        logger.info(message);
      },
    },
  }));

  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });

  app.use(app.auth.init());

  app.use(express.static('public'));
};
