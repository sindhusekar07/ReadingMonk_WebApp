'use strict';
module.exports = function(app) {
  var books = require('../controllers/booksController');

  // todoList Routes
  app.route('/books')
    .get(books.list_all_books)
    .post(books.create_a_book);


  app.route('/books/:bookId')
    .get(books.read_a_book)
    .put(books.update_a_book)
    .delete(books.delete_a_book);


  app.route('/books/getByUserId/:user_id')
      .get(books.list_with_user_id);

  app.route('/books/getReqBooksByUserId/:user_id')
      .get(books.list_req_with_user_id)

  app.route('/books/searchBooks/:query')
      .get(books.search_books);

};