const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   address: {
      type: String,
      required: true
   },
   mobilenumber: {
      type: Number,
   },
   city:{
      type: String,
   },
   province:{
      type: String,
      required: true
   },
   zipcode:{
      type: String,
      required: true
   },
   resetLink: {
      data: String,
      default:''
   }
},{
   timestamps: true,
   collection: 'users'
})
module.exports = mongoose.model('User', userSchema);
