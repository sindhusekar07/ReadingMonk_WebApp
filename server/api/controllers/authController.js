const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mailgun = require('mailgun-js');
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
//const mg = mailgun({apiKey : process.env.MAILGUN_API_KEY, domain : DOMAIN});
const bcrypt = require('bcrypt');
const {
   createJWT,
} = require("../utils/authUtils");
const { updateOne } = require('../models/userModel');
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.signup = (req, res, next) => {
  let { name, email, password, password_confirmation, address, mobilenumber, city, province, zipcode } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
     password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "mismatch" });
  }
  if (!address) {
    errors.push({ address: "required" });
  }
  //if (!mobilenumber) {
    //errors.push({ mobilenumber: "required" });
  //}
  //if (!city) {
    //errors.push({ city: "required" });
  //}
  if (!province) {
    errors.push({ province: "required" });
  }
  if (!zipcode) {
    errors.push({ zipcode: "required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
 User.findOne({email: email})
    .then(user=>{
       if(user){
          return res.status(422).json({ errors: [{ user: "email already exists" }] });
       }else {
         const user = new User({
           name: name,
           email: email,
           password: password,
           address: address,
           mobilenumber: mobilenumber,
           city: city,
           province: province,
           zipcode: zipcode,
         });
 bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
         if (err) throw err;
         user.password = hash;
         user.save()
             .then(response => {
                res.status(200).json({
                  success: true,
                  result: response
                })
             })
             .catch(err => {
               res.status(500).json({
                  errors: [{ error: err }]
               });
            });
         });
      });
     }
  }).catch(err =>{
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }]
      });
  })
}
exports.signin = (req, res) => {
     let { email, password } = req.body;
     let errors = [];
     if (!email) {
       errors.push({ email: "required" });
     }
     if (!emailRegexp.test(email)) {
       errors.push({ email: "invalid email" });
     }
     if (!password) {
       errors.push({ password: "required" });
     }
     if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
     }
     User.findOne({ email: email }).then(user => {
        if (!user) {
          return res.status(404).json({
            errors: [{ user: "not found" }],
          });
        } else {
           bcrypt.compare(password, user.password).then(isMatch => {
              if (!isMatch) {
                //console.log(password)
                //console.log(user.password)
               return res.status(400).json({ errors: [{ password:
"incorrect" }] 
               });
              }
       let access_token = createJWT(
          user.email,
          user._id,
          3600
       );
       jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
decoded) => {
         if (err) {
           console.error (err);
            res.status(500).json({ errors: err.message });
         }
         if (decoded) {
             return res.status(200).json({
                success: true,
                token: access_token,
                message: user
             });
           }
         });
        }).catch(err => {
          res.status(500).json({ errors: err.message });
        });
      }
   }).catch(err => {
      res.status(500).json({ errors: err.message });
   });
};

exports.forgotpassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }).then(user => {
    if(!user) {
      return res.status(404).json({
        errors: [{ user: "not found"}],
      });
    };
    let access_token = createJWT(user.email,user._id,3600);
    const data ={
      from: 'noreply@readingmonk.com',
      to : email,
      subject: 'Token to change password',
      html:
      `<h2> Please find the token to change password </h2> <p> Token : ${access_token} </p>`
    };
    return User.updateOne({resetLink: access_token}, {new: true},(err, success) => { 
      if(err){
        return res.status(404).json({
          errors:"Reset password error"});
        }
        else{
          mg.messages().send(data, function (error, body) {
            if(error){
              res.status(500).json({ errors: error.message });
            };
            return res.json({message: 'Token is sent successfully to change the password'});
          });
        }
      });
    });
};

exports.resetpassword = (req, res) => {
  const {resetLink, newpassword, email} = req.body;
  //console.log(resetLink);
  //console.log(email);
  if(resetLink){
    jwt.verify(resetLink, process.env.TOKEN_SECRET, (err,decoded) =>{
      if(err){
        console.error(err);
        res.status(500).json ({errors:err.message});
      }
      User.findOne({email : email}, (err,user) => {
        if(err || !user){
          return res.status(400).json({errors: 'user with this token does not exists'});
        }
        const obj = {
          password : newpassword,
          resetLink : ''
        }
        bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(newpassword, salt, function(err, hash) {
          if (err) throw err;
          user.password = hash;
          console.log(user.password)
        //user = _.extend(user, obj);
        user.save((err,result) => {
          if(err){
            console.log(err)
            return res.status(400).json({errors: "reset password error"});
          } else{
            return res.status(200).json({message: "Password has been changed"});
          }
        })
      })
    })
      })
    })
        } else{
          return res.status(400).json({errors: "Authentication error!"});
        }
  
};