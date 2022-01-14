'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const authUtils = require("../utils/authUtils");



var BookSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the book'
  },
  author:{
    type: String,
    required: 'Please enter the author name'
  },
  publication_year: {
    type: Date,
    required: 'Please enter the publication year'
  },  
  first_date_to_portal: {
    type: Date,
    default: Date.now
  },
  image:{
    type: String
  },
  in_language:{
    type: String,
    required: 'Please enter the bool langauge'
  },
  number_of_pages: {
    type: Number 
  },
  publisher:{
    type: String,
    required: 'Please enter the publisher'
  },
  aggregated_rating:{
    type: [{
      type: Number,
      enum: [0,1,2,3,4,5]
    }],
    default: [0]
  },
  user_id:{
    type: String,
    required: 'user_id is mandatory, it will link with the user'
  },
  book_status:{
    type: [{
      type: String,
      enum: ['Available','Not Available','Requested','Request Complete']
    }],
    default: ['Available']
  },
  book_location:{
    type: String,
    required: 'Please enter location, else user default will be picker.'
  }
});


module.exports = mongoose.model('Books', BookSchema);

