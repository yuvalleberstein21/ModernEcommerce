const express = require('express');
const { loginUser, registerUser } = require('../controllers/userController');


const router = express.Router();

// Register user
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;