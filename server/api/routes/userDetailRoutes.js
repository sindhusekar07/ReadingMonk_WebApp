'use strict';
module.exports = function(app) {
  var userDetails = require('../controllers/userDetailController');

  app.route('/User/getByUserId/:user_id')
  .get(userDetails.list_with_user_id);
};