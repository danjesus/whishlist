"use strict";

import jwt from 'jsonwebtoken';
import express from 'express';

const app = express();
let debug = require('debug')('middleware:auth');

export default function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res
      .status(403)
      .send({
        success: false,
        message: 'No token provided'
      });
  }

  jwt.verify(token, app.get('jwtSecret'), (err, decoded) => {
    if (err) {
      debug('Authentication failed');

      return res
        .status(401)
        .send({
          success: false,
          message: 'Authentication failed'
        });
    }

    req.decoded = decoded;
    next();
  });
}

