const express = require('express');
const router = express.Router();
const { signup, signin, forgotpassword, resetpassword } = require('../controllers/authController');
router.post('/signup', signup);
router.post('/signin', signin);
router.put('/forgotpassword', forgotpassword);
router.put('/resetpassword', resetpassword);

module.exports = router;
