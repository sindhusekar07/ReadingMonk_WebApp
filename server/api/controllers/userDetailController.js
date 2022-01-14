'use strict';

const jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

const authUtils = require("../utils/authUtils");

exports.list_with_user_id = function (req, res) {
    var authStatus = {};
    authUtils.validateAuth(req, res, authStatus);
    if (authStatus['auth'] === false) {
        return res.send({auth: false, message: authStatus['message']})
    }
    console.log("input user id " + req.params.user_id);
    User.findOne({email: req.params.user_id},'name email address city province zipcode', function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};
