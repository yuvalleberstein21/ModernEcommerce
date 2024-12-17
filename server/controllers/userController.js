const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { generateToken } = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');



const JWT_SECRET = process.env.JWT_SECRET

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill the following fields' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        const isPasswordValid = await user.matchPassword(password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        const token = generateToken(user._id)

        res.status(200).json({
            message: 'Login Success',
            token,
            user: { _id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
        });
    } catch (err) {
        res.status(500).json({ message: 'שגיאת שרת: ' + err.message });
    }
});

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill the following fields" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password,
        });

        console.log('Before saving user:', newUser);
        await newUser.save();

        const token = generateToken(newUser._id);

        res.status(201).json({
            message: "משתמש נרשם בהצלחה",
            token,
            user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
        });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "שגיאת שרת: " + err.message });
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error retrieving profile' });
    }
});


// Forgot password

// const forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;

//         console.log(email)

//         // Find user by email
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: 'No account with that email found' });
//         }

//         // Generate reset token
//         const resetToken = crypto.randomBytes(20).toString('hex');

//         // Hash token and set expiry
//         user.resetPasswordToken = crypto
//             .createHash('sha256')
//             .update(resetToken)
//             .digest('hex');
//         user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

//         await user.save();

//         // Create reset URL
//         const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

//         // Send email (you'll need to configure nodemailer)
//         const transporter = nodemailer.createTransport({
//             // Configure your email service here
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         const mailOptions = {
//             from: 'noreply@designYL.com',
//             to: user.email,
//             subject: 'Password Reset Request',
//             text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//                   Please click on the following link, or paste this into your browser to complete the process:\n\n
//                   ${resetUrl}\n\n
//                   If you did not request this, please ignore this email and your password will remain unchanged.\n`
//         };

//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ message: 'Password reset email sent' });
//     } catch (error) {
//         console.error(error);

//         // Check if a user was found before trying to modify it
//         if (req.body.email) {
//             try {
//                 const user = await User.findOne({ email: req.body.email });
//                 if (user) {
//                     user.resetPasswordToken = undefined;
//                     user.resetPasswordExpire = undefined;
//                     await user.save();
//                 }
//             } catch (saveError) {
//                 console.error('Error clearing reset token', saveError);
//             }
//         }

//         res.status(500).json({ message: 'Error sending password reset email' });
//     }
// }

// const resetPassword = async (req, res) => {
//     try {
//         const { token } = req.params;
//         const { password } = req.body;

//         // Hash incoming token to compare with stored token
//         const hashedToken = crypto
//             .createHash('sha256')
//             .update(token)
//             .digest('hex');

//         // Find user with matching token that hasn't expired
//         const user = await User.findOne({
//             resetPasswordToken: hashedToken,
//             resetPasswordExpire: { $gt: Date.now() }
//         });

//         if (!user) {
//             return res.status(400).json({ message: 'Invalid or expired reset token' });
//         }

//         // Set new password
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         // Clear reset token fields
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;

//         await user.save();

//         res.status(200).json({ message: 'Password reset successful' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error resetting password' });
//     }
// }

module.exports = { loginUser, registerUser, getUserProfile };