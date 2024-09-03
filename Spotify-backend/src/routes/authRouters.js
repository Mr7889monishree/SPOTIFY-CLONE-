const express = require('express');
const router = express.Router();
const { test, registerUser,loginUser,profilesetter } = require('../controller/authController');

router.get('/', test);
router.post('/register', registerUser);
router.post('/login',loginUser)
router.get('/profile',profilesetter)
module.exports = router;
