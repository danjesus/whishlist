'use strict';

module.exports = app => {
  let port = app.get('port');

  app.listen(3000, () => {
    console.log('Whishlist API - ready on %d', port);
  });
}
