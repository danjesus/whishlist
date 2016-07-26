'use strict';

import PasswordFactory from '../lib/password.factory';

module.exports = app => {

  const User = app.db.models.User;

  app.route('/user')
    .all(app.auth.authenticate())
    .get((req, res) => {
      User.findById(req.user.id, {
        attributes: ['name', 'email', 'full_address', 'created_at', 'updated_at']
      })
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => {
          res.status(412).json({ message: err.message });
        });
    })
    .put((req, res) => {
      if (req.body.password) {
        req.body.password = PasswordFactory.create(req.body.password);
      }
      
      User.update(req.body, {
        where: {
          id: req.user.id
        }
      })
        .then(result => res.sendStatus(204))
        .catch(err => {
          res.status(412).json({ message: err.message });
        });
    });
};