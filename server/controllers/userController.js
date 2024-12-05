const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");


const JWT_SECRET = process.env.JWT_SECRET

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'אנא ספק שם משתמש וסיסמא' });
        }

        const user = await User.findOne({ email });
        console.log(user)

        if (!user) {
            return res.status(401).json({ message: 'שם משתמש או סיסמא אינם נכונים' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'שם משתמש או סיסמא אינם נכונים' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET, // Use environment variable
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'התחברת בהצלחה',
            token,
            user: { id: user.id, email: user.email, name: user.name },
        });
    } catch (err) {
        res.status(500).json({ message: 'שגיאת שרת: ' + err.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "אנא ספק שם, כתובת אימייל וסיסמה" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: "משתמש זה כבר רשום במערכת" });
        }

        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password,
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "משתמש נרשם בהצלחה",
            token,
            user: { id: newUser.id, email: newUser.email, name: newUser.name },
        });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "שגיאת שרת: " + err.message });
    }
};

module.exports = { loginUser, registerUser };