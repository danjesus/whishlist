

import jwt from 'jsonwebtoken';

module.exports = app => {
  const User = app.db.models.User;

  /**
   * @api {post} /token Get a Token
   * @apiGroup Crendential
   * @apiParam {String} email User email
   * @apiParam {String} password User password
   * @apiParamExample {json} entry
   *    {
   *      "email": "steve.woz@apple.com",
   *      "password": "123456"
   *    }
   * @apiSuccess {String} token Authenticated user token
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *      "token": "token.xpto"
   *    }
   * @apiErrorExample {json} Authentication error
   *    HTTP/1.1 401 Unauthorized
   *
   * @apiErrorExample {json} Invalid parameters
   *    HTTP/1.1 400 Bad Request
   */
  app.post('/token', (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.sendStatus(400);
    }

    const email = req.body.email;
    const password = req.body.password;

    return User.findOne({
      where: {
        email,
      },
    })
      .then(user => {
        if (!user || !User.isPassword(user.password, password)) {
          return res.sendStatus(401);
        }

        const payload = { id: user.id };

        return res
          .status(200)
          .json({
            token: jwt.sign(payload, app.get('jwtSecret')),
          });
      });
  });
};
