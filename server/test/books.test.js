var app = require('../index'),
    chai = require('chai'),
    request = require('supertest');
const chaiHttp = require("chai-http");
chai.use(chaiHttp);




describe('/POST books', () => {
    it('Create a new Book to the Books Collection', (done) => {
        let book = {
            name: "Hilarious",
            author: "Kaithy Pears",
            publication_year: "01-JAN-2020",
            in_language: "German",
            number_of_pages: 200,
            publisher: "O Reily",
            user_id: "Jay@gmail.com",
            book_location: "New Delhi",
            book_status: "Requested"
        }
        request(app)
            .post('/books')
            .send(book).set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BhYmMuY29tIiwidXNlcklkIjoiNjA1ZmEzMDg3NmE2OTMwMDFmZTQxN2I3IiwiZHVyYXRpb24iOjM2MDAsImlhdCI6MTYxNjg5MTM2MCwiZXhwIjoxNjE2ODk0OTYwfQ.ATaBPv6h0P-lXDTfQMuZBnM9djNSE4sbqP52GBPRDp")
            .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
    });

});

describe('/POST books', () => {
    it('it should not POST a book without pages field', (done) => {
        let book = {
            name: "Hilarious",
            author: "Kaithy Pears",
            publication_year: "01-JAN-2020",
            in_language: "German",
            number_of_pages: 200,
            publisher: "O Reily",
            user_id: "Jay@gmail.com",
            book_location: "New Delhi",
            book_status: "Requested"
        }
        request(app)
            .post('/books')
            .send(book).set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BhYmMuY29tIiwidXNlcklkIjoiNjA1ZmEzMDg3NmE2OTMwMDFmZTQxN2I3IiwiZHVyYXRpb24iOjM2MDAsImlhdCI6MTYxNjg5MTM2MCwiZXhwIjoxNjE2ODk0OTYwfQ.ATaBPv6h0P-lXDTfQMuZBnM9djNSE4sbqP52GBPRDp")
            .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
    });

});

describe('/Get books', () => {
    it('Get all the books', (done) => {
        request(app)
            .get('/books')
            .send().set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BhYmMuY29tIiwidXNlcklkIjoiNjA1ZmEzMDg3NmE2OTMwMDFmZTQxN2I3IiwiZHVyYXRpb24iOjM2MDAsImlhdCI6MTYxNjg5MTM2MCwiZXhwIjoxNjE2ODk0OTYwfQ.ATaBPv6h0P-lXDTfQMuZBnM9djNSE4sbqP52GBPRDp")
            .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
    });

});

describe('/DELETE books', () => {
    it('Delete the book from the collection', (done) => {
        let book = {
            name: "Hilarious",
            author: "Kaithy Pears",
            publication_year: "01-JAN-2020",
            in_language: "German",
            number_of_pages: 200,
            publisher: "O Reily",
            user_id: "Jay@gmail.com",
            book_location: "New Delhi",
            book_status: "Requested"
        }
        request(app)
            .delete('/books')
            .send(book).set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BhYmMuY29tIiwidXNlcklkIjoiNjA1ZmEzMDg3NmE2OTMwMDFmZTQxN2I3IiwiZHVyYXRpb24iOjM2MDAsImlhdCI6MTYxNjg5MTM2MCwiZXhwIjoxNjE2ODk0OTYwfQ.ATaBPv6h0P-lXDTfQMuZBnM9djNSE4sbqP52GBPRDp")
            .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
    });

});


describe('/Update books', () => {
    it('Update an existing book', (done) => {
        let book = {
            name: "Hilarious",
            author: "Kaithy Pears",
            publication_year: "01-JAN-2020",
            in_language: "German",
            number_of_pages: 200,
            publisher: "O Reily",
            user_id: "Jay@gmail.com",
            book_location: "New Delhi",
            book_status: "Requested"
        }
        request(app)
            .post('/books')
            .send(book).set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BhYmMuY29tIiwidXNlcklkIjoiNjA1ZmEzMDg3NmE2OTMwMDFmZTQxN2I3IiwiZHVyYXRpb24iOjM2MDAsImlhdCI6MTYxNjg5MTM2MCwiZXhwIjoxNjE2ODk0OTYwfQ.ATaBPv6h0P-lXDTfQMuZBnM9djNSE4sbqP52GBPRDp")
            .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
    });

});

describe('/Search books', () => {
    it('Search Book, it should return the book previously added', (done) => {
        request(app)
            .get('/books/searchBook/Hilarious')
            .send().set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BhYmMuY29tIiwidXNlcklkIjoiNjA1ZmEzMDg3NmE2OTMwMDFmZTQxN2I3IiwiZHVyYXRpb24iOjM2MDAsImlhdCI6MTYxNjg5MTM2MCwiZXhwIjoxNjE2ODk0OTYwfQ.ATaBPv6h0P-lXDTfQMuZBnM9djNSE4sbqP52GBPRDp")
            .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
    });

});

// app.route('/books/getReqBooksByUserId/:user_id')

describe('/Get books/getReqBooksByUserID', () => {
    it('Get requested books for a user ID', (done) => {
        request(app)
            .get('/books/getReqBooksByUserId/Jay@gmail.com')
            .send().set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BhYmMuY29tIiwidXNlcklkIjoiNjA1ZmEzMDg3NmE2OTMwMDFmZTQxN2I3IiwiZHVyYXRpb24iOjM2MDAsImlhdCI6MTYxNjg5MTM2MCwiZXhwIjoxNjE2ODk0OTYwfQ.ATaBPv6h0P-lXDTfQMuZBnM9djNSE4sbqP52GBPRDp")
            .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
    });

});


describe('/POST signup', () => {
    it('signup should create a new user in the system', (done) => {
        let user = {
            name: "Ajay",
            email : "abc@abc.com",
            password : "abc",
            password_confirmation : "abc",
            address : "Delhi",
            province : "Delhi",
            zipcode : 124001
        }
        request(app)
            .post('/signup')
            .send(user)
            .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
    });

});


describe('/POST signin', () => {
    it('Sign in should be succesfull and return status 200', (done) => {
        let user = {
            email : "abc@abc.com",
            password : "abc"
        }
        request(app)
            .post('/signin')
            .send(user).end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
    });

});


describe('/Get /User/getByUserId/:user_id', () => {
    it('Get Details of any user', (done) => {
        let user = {
            email : "abc@abc.com",
            password : "abc"
        }
        request(app)
            .get('/User/getByUserId/abc@abc.com')
            .send().set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BhYmMuY29tIiwidXNlcklkIjoiNjA1ZmEzMDg3NmE2OTMwMDFmZTQxN2I3IiwiZHVyYXRpb24iOjM2MDAsImlhdCI6MTYxNjg5MTM2MCwiZXhwIjoxNjE2ODk0OTYwfQ.ATaBPv6h0P-lXDTfQMuZBnM9djNSE4sbqP52GBPRDp")
            .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
    });

});