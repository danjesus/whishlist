'use strict';

module.exports = app => {
  const Whishlist = app.db.models.Whishlist;
  /**
     * @api {get} /whishlist/?name? List all items
     * @apiGroup Whishlist
     * @apiHeader {String} Authorization token
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT token.xpto"}
     * @apiParam {query} name Query string name 
     * @apiSuccess {Integer} id Item id 
     * @apiSuccess {String} name Item name
     * @apiSuccess {String} description Item description
     * @apiSuccess {Decimal} average_value Avg item value
     * @apiSuccess {Date} updated_at Update date
     * @apiSuccess {Date} created_at Create date
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 ok
     *    [{
     *      "id": 25,
     *      "name": "New Mac Book retina",
     *      "description": "Novo Macbook test",
     *      "average_value": "1000",
     *      "created_at": "2016-07-26T04:40:38.413Z",
     *      "updated_at": "2016-07-26T04:40:38.413Z"
     *    },
     *    {
     *      "id": 26,
     *      "name": "Old Book retina",
     *      "description": "Novo Macbook test",
     *      "average_value": "1000",
     *      "created_at": "2016-07-26T04:40:38.413Z",
     *      "updated_at": "2016-07-26T04:40:38.413Z"
     *    }]
     * @apiErrorExample {json} Query error
     *    HTTP/1.1 412 Precondition Failed
     */
  app.route('/whishlist')
    .all(app.auth.authenticate())
    .get((req, res) => {

      let queryParams = {
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
      };

      if (req.query.name) {
        queryParams.where.name = {
          $like: `%${req.query.name}%`
        };
      }

      Whishlist.findAll(
        queryParams
      ).then(result => {
        res.status(200).json(result);
      });
    })
    /**
     * @api {post} /whishlist Add a new item
     * @apiGroup Whishlist
     * @apiHeader {String} Authorization token
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT token.xpto"}
     * @apiParam {String} name Item name
     * @apiParam {String} description Item description
     * @apiParam {Decimal} average_value Avg item value
     * @apiParamExample {json} Request payload
     *    {
     *      name: "New Mac Book retina",
     *      average_value: 1000,
     *      description: "Novo Macbook test"
     *    }
     * @apiSuccess {Integer} id Item id 
     * @apiSuccess {String} name Item name
     * @apiSuccess {String} description Item description
     * @apiSuccess {Decimal} average_value Avg item value
     * @apiSuccess {Date} updated_at Update date
     * @apiSuccess {Date} created_at Create date
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 201 created
     *    {
     *      "id": 25,
     *      "name": "New Mac Book retina",
     *      "description": "Novo Macbook test",
     *      "average_value": "1000",
     *      "created_at": "2016-07-26T04:40:38.413Z",
     *      "updated_at": "2016-07-26T04:40:38.413Z"
     *    }
     * @apiErrorExample {json} Query error
     *    HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Invalid Parameters
     *    HTTP/1.1 400 Bad Request
     */
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
    /**
     * @api {get} /whishlist Display a whish list item
     * @apiGroup Whishlist
     * @apiHeader {String} Authorization token
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT token.xpto"}
     * @apiParam {id} id Whishlist item id
     * @apiSuccess {Integer} id Item id 
     * @apiSuccess {String} name Item name
     * @apiSuccess {String} description Item description
     * @apiSuccess {Decimal} average_value Avg item value
     * @apiSuccess {Date} updated_at Update date
     * @apiSuccess {Date} created_at Create date
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 ok
     *    {
     *      "id": 26,
     *      "name": "Old Book retina",
     *      "description": "Novo Macbook test",
     *      "average_value": "1000",
     *      "created_at": "2016-07-26T04:40:38.413Z",
     *      "updated_at": "2016-07-26T04:40:38.413Z"
     *    }
     * @apiErrorExample {json} Query error
     *    HTTP/1.1 412 Precondition Failed
     * @apiErrorExample {json} Not found
     *    HTTP/1.1 404 Not found
     */
    .get((req, res) => {
      Whishlist.findOne({
        where: {
          id: req.params.id,
          user_id: req.user.id
        },
        attributes: [
          'name',
          'id',
          'description',
          'average_value',
          'created_at',
          'updated_at'
        ]
      })
        .then(result => {
          if (result) {
            return res.status(200).json(result);
          }

          return res.sendStatus(404);
        })
        .catch(err => {
          res.status(412).json({ message: err.message });
        });
    })
    /**
     * @api {put} /whishlist Update whishlist item
     * @apiGroup Whishlist
     * @apiHeader {String} Authorization token
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT token.xpto"}
     * @apiParam {String} name Item name
     * @apiParam {String} description Item description
     * @apiParam {Decimal} average_value Avg item value
     * @apiParamExample {json} Request payload
     *    {
     *      name: "New Mac Book retina",
     *      average_value: 1000,
     *      description: "Novo Macbook test"
     *    }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Query error
     *    HTTP/1.1 412 Precondition Failed
     */
    .put((req, res) => {
      Whishlist.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.user.id
        }
      })
        .then(result => res.sendStatus(204))
        .catch(err => {
          res.status(412).json({ message: err.message });
        });
    })
    /**
     * @api {delete} /whishlist/:id Remove an whishlist item
     * @apiGroup Whishlist
     * @apiHeader {String} Authorization token
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT token.xpto"}
     * @apiParam {id} id Whishlist item id 
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Query error
     *    HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      Whishlist.destroy({
        where: {
          id: req.params.id,
          user_id: req.user.id
        }
      })
        .then(result => res.sendStatus(204))
        .catch(err => {
          res.status(412).json({ message: err.message });
        });
    });
};