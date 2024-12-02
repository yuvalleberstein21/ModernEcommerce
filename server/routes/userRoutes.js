const express = require('express');
const { loginUser } = require('../controllers/userController');


const router = express.Router();

// Register user
router.post('/login', loginUser);

module.exports = router;