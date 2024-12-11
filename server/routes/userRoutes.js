const express = require('express');
const { loginUser, registerUser, getUserProfile, } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');



const router = express.Router();

// Register user
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', authenticateJWT, getUserProfile);
// router.put('/profile', auth, updateUserProfile);
// router.post('/forgot-password', forgotPassword);
// router.put('/reset-password/:token', resetPassword);

module.exports = router;