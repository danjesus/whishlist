'use strict';

module.exports = app => {
   /**
   * @api {get} / API Status
   * @apiGroup Status
   * @apiSuccess {String} status Api status message
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *      "status": "Whishlist API ready"
   *    }
   */
  app.get('/', (req, res) => {
    res
      .status(200)
      .json({
        status: 'Whishlist API ready',
      });
  });
};
