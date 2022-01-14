const keys = require('./keys');
const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000


mongoose = require('mongoose');
booksModel= require('./api/models/booksModel');
bodyParser = require('body-parser');


//import routes
const { userModel } = require('./api/models/userModel');
const authRoutes = require('./api/routes/authRoutes');

connection_string = 'mongodb://' + keys.mongoUser + ':' + keys.mongoPassword + '@' + keys.mongoHost + ':' + keys.MONGO_PORT + '/' + keys.mongoDatabase
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
  return mongoose.connect(connection_string)
}


// Exit application on error
mongoose.connection.on('error', err => {
  console.log(`MongoDB connection error: ${err}`)
  setTimeout(connectWithRetry, 5000)
  // process.exit(-1)
})

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected')
});

const connect = () => {
  connectWithRetry()
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


var routes = require('./api/routes/booksRoutes'); //importing route
routes(app); //register the route
routes = require('./api/routes/userDetailRoutes'); //importing route
routes(app); //register the route
app.use('/', authRoutes);
connect();
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


module.exports = app;