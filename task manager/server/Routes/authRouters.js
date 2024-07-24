const express = require('express');
const { signup, login } = require('../Controllers/AuthController');
const { signupValidations, loginValidations } = require('../Middleware/AuthValidation');

const router = express.Router();

router.post('/login', loginValidations, login);

router.post('/signup', signupValidations, signup);

module.exports = router;
