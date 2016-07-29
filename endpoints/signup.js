'use strict';

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
  app.post('/signup', (req, res) => {

    if (!req.body.name || !req.body.email || !req.body.password || !req.body.zipcode) {
      return res
        .status(400)
        .json({
          message: 'Invalid parameters'
        });
    }

    let zipCodeFinderUrl = 'http://correiosapi.apphb.com/cep/' + req.body.zipcode;

    request(zipCodeFinderUrl, (err, response, body) => {

      if (err) {
        return res
          .status(400)
          .json({
            message: 'Zip code finder request error'
          });
      }

      let fullAddress = JSON.parse(body);

      if (fullAddress.message) {
        return res
          .status(400)
          .json({
            message: 'Address not found'
          });
      }

      req.body.full_address = fullAddress;
      
      User.create(req.body)
        .then(result => {
          res
            .status(201)
            .json({
              message: 'User created'
            });
        })
        .catch(err => {
          res
            .status(412)
            .json({
              message: err.message
            });
        });
    });
  });
};
