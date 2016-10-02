import request from 'request';

module.exports = app => {
  const User = app.db.models.User;

        /**
         * @api {post} /signup Create a user
         * @apiGroup Crendential
         * @apiParam {String} name User name
         * @apiParam {String} email User email
         * @apiParam {String} password User password
         * @apiParam {String} zipcode User brazil postal code
         * @apiParamExample {json} entry
         *    {
         *      "email": "steve.woz@apple.com",
         *      "password": "123456",
         *      "name": "Steve woz",
         *      "zipcode": "04429280"
         *    }
         * @apiSuccess {String} data Sucess message
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 201 OK
         *   {
         *      message: 'User created'
         *   }
         * @apiErrorExample {json} Invalid parameters
         *    HTTP/1.1 400 Bad Request
         */
  app.post('/signup', (_req, res) => {
    const req = _req;

    if (!req.body.name || !req.body.email || !req.body.password || !req.body.zipcode) {
      return res
        .status(400)
        .json({
          message: 'Invalid parameters',
        });
    }

    const ZIP_CODE_FINDER_URL = `http://correiosapi.apphb.com/cep/${req.body.zipcode}`;

    request(ZIP_CODE_FINDER_URL, (err, response, body) => {
      if (err) {
        return res
          .status(400)
          .json({
            message: 'Zip code finder request error',
          });
      }

      const fullAddress = JSON.parse(body);

      if (fullAddress.message) {
        return res
          .status(400)
          .json({
            message: 'Address not found',
          });
      }

      req.body.full_address = fullAddress;

      return User.create(req.body)
        .then(() => res.status(201).json({ message: 'User created' }))
        .catch(error => res.status(412).json({ message: error.message }));
    });

    return true;
  });
};
