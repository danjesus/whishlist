'use strict';

module.exports = app => {

  app.post('/signup', (req, res) => {
    res
      .status(201)
      .json({
        message: 'User created'
      });
  });

};
