'use strict';

module.exports = app => {
  const Whishlist = app.db.models.Whishlist;

  app.route('/whishlist')
    .all(app.auth.authenticate())
    .get((req, res) => {

      Whishlist.findAll({
        attributes: [
          'name',
          'id',
          'description',
          'average_value',
          'created_at',
          'updated_at'
        ],
        where: {
          user_id: req.user.id
        }
      }).then(result => {
        res.status(200).json(result);
      });
    })
    .post((req, res) => {

      if (!req.body.name || !req.body.description || !req.body.average_value) {
        return res.sendStatus(400);
      }

      req.body.user_id = req.user.id;

      Whishlist.create(req.body)
        .then(result => {
          let item = {
            id: result.id,
            name: result.name,
            description: result.description,
            average_value: result.average_value,
            created_at: result.created_at,
            updated_at: result.updated_at
          };

          res
            .status(201)
            .json(item);
        })
        .catch(err => {
          res
            .status(412)
            .json({
              message: err.message
            });
        });
    });

  app.route('/whishlist/:id')
    .all(app.auth.authenticate())
    .put((req, res) => {
      Whishlist.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.user.id
        }
      })
      .then(result => res.sendStatus(204))
      .catch(err => {
        res.status(412).json({message: err.message});
      });
    })
    .delete((req, res) => {
      Whishlist.destroy({
        where: {
          id: req.params.id,
          user_id: req.user.id
        }
      })
      .then(result => res.sendStatus(204))
      .catch(err => {
        res.status(412).json({message: err.message});
      });
    });
};