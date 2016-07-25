'use strict';

import jwt from 'jsonwebtoken';

module.exports = app => {
  const User = app.db.models.User;
  const config = app.config[app.get('env')];

  app.post('/token', (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.sendStatus(400);
    }

    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
      where: {
        email: email
      }
    })
      .then(user => {

        if (!user || !User.isPassword(user.password, password)) {
          return res.sendStatus(401);
        }

        const payload = { id: user.id };

        res
          .status(200)
          .json({
            token: jwt.sign(payload, config.secret)
          });
      });
  })
}