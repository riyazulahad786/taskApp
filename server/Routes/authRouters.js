const express = require('express');
const { signup, login,createTask,updateTask, deleteTask, getTask, getAllTasksForUser, googleSignup } = require('../Controllers/AuthController');
const { signupValidations, loginValidations } = require('../Middleware/AuthValidation');

const router = express.Router();

router.post('/login', loginValidations, login);

router.post('/signup', signupValidations, signup);
router.post('/createTask', createTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id',deleteTask);
router.get('/getTask/:id',getTask);
router.get('/getAllTasksForUser/:userId', getAllTasksForUser);
router.post('/google-signup',googleSignup)

module.exports = router;
