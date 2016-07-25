'use strict';

import express from 'express';
import consign from 'consign';

const app = express();

consign({verbose: false})
  .include('db.js')
  .then('models')
  .then('lib/middlewares.js')
  .then('endpoints')
  .then('lib/boot.js')
  .into(app);

  module.exports = app;
