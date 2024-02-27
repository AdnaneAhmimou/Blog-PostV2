const express = require('express');
const router = express.Router();
const authController = require('../controller/userController');

router.get('/', authController.getAllUsers);

router.post('/login', authController.login);

router.post('/register', authController.register);

router.post('/logout', authController.logOut);

module.exports = router;

