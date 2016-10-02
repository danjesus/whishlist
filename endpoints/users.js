import PasswordFactory from '../lib/password.factory';

module.exports = app => {
  const User = app.db.models.User;

  app.route('/user')
    .all(app.auth.authenticate())
    /**
     * @api {get} /user Fetch current user data
     * @apiGroup User
     * @apiHeader {String} Authorization token
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT token.xpto"}
     * @apiParamExample {json} Request payload
     * {
        "name": "Daniel Jesus",
        "email": "danper.jesus@gmail.com",
        "full_address": {
          "cep": "04429280",
          "tipoDeLogradouro": "Rua",
          "logradouro": "Cláudia Muzio",
          "bairro": "Americanópolis",
          "cidade": "São Paulo",
          "estado": "SP"
        },
        "created_at": "2016-07-26T02:25:05.820Z",
        "updated_at": "2016-07-26T02:25:05.820Z"
      }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 ok
     * @apiErrorExample {json} Query error
     *    HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      User.findById(req.user.id, {
        attributes: ['name', 'email', 'full_address', 'created_at', 'updated_at'],
      })
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => {
          res.status(412).json({ message: err.message });
        });
    })
    /**
     * @api {put} /user Update current user
     * @apiGroup User
     * @apiHeader {String} Authorization token
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT token.xpto"}
     * @apiParam {String} name User fullname
     * @apiParam {String} email User email
     * @apiParam {String} password User password
     * @apiParam {String} zipcode User postal code
     * @apiParamExample {json} Request payload
     *    {
     *      name: "Steve woz",
     *      email: 'nobody@gmail.com',
     *      password: "12345",
     *      zipcode: 04429280
     *    }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Query error
     *    HTTP/1.1 412 Precondition Failed
     */
    .put((_req, res) => {
      const req = _req;

      if (req.body.password) {
        req.body.password = PasswordFactory.create(req.body.password);
      }

      User.update(req.body, {
        where: {
          id: req.user.id,
        },
      })
        .then(() => res.sendStatus(204))
        .catch(err => res.status(412).json({ message: err.message }));
    });
};
