'use strict';

const jwt = require('jsonwebtoken');
var mongoose = require('mongoose'),
    Book = mongoose.model('Books');

const authUtils = require("../utils/authUtils");


exports.list_all_books = function (req, res) {
    var authStatus = {};
    authUtils.validateAuth(req, res, authStatus);
    if (authStatus['auth'] === false) {
        return res.send({auth: false, message: authStatus['message']})
    }

    Book.find({}, function (err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};


exports.create_a_book = function (req, res) {

    var authStatus = {};
    authUtils.validateAuth(req, res, authStatus);
    if (authStatus['auth'] === false) {
        return res.send({auth: false, message: authStatus['message']})
    }

    var new_book = new Book(req.body);
    new_book.save(function (err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};


exports.read_a_book = function (req, res) {

    var authStatus = {};
    authUtils.validateAuth(req, res, authStatus);
    if (authStatus['auth'] === false) {
        return res.send({auth: false, message: authStatus['message']})
    }

    Book.findById(req.params.bookId, function (err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};


exports.update_a_book = function (req, res) {
    var authStatus = {};
    authUtils.validateAuth(req, res, authStatus);
    if (authStatus['auth'] === false) {
        return res.send({auth: false, message: authStatus['message']})
    }
    Book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true}, function (err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};


exports.delete_a_book = function (req, res) {
    var authStatus = {};
    authUtils.validateAuth(req, res, authStatus);
    if (authStatus['auth'] === false) {
        return res.send({auth: false, message: authStatus['message']})
    }
    Book.remove({
        _id: req.params.bookId
    }, function (err, book) {
        if (err)
            res.send(err);
        res.json({message: 'Book successfully deleted'});
    });
};


exports.list_with_user_id = function (req, res) {
    var authStatus = {};
    authUtils.validateAuth(req, res, authStatus);
    if (authStatus['auth'] === false) {
        return res.send({auth: false, message: authStatus['message']})
    }
    Book.find({user_id: req.params.user_id,  book_status: 'Available'}, function (err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};

exports.search_books = function (req, res){
    var authStatus = {};
    authUtils.validateAuth(req, res, authStatus);
    if (authStatus['auth'] === false) {
        return res.send({auth: false, message: authStatus['message']})
    }

    var regex = new RegExp(req.params.query, 'i');
    Book.find({name:regex,  book_status: 'Available'}, function (err, book){
        if (err)
            res.send(err);
        res.json(book);
    });
};

exports.list_req_with_user_id = function (req, res){
    var authStatus = {};
    authUtils.validateAuth(req, res, authStatus);
    if (authStatus['auth'] === false) {
        return res.send({auth: false, message: authStatus['message']})
    }

    Book.find({user_id: req.params.user_id, book_status: 'Requested'}, function (err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });

};