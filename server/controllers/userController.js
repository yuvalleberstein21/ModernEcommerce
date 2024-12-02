const { fakeUsers } = require("../fakeData");
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET
// Login user (mock)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = fakeUsers.find((u) => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({ message: 'שגיאה בהזנת נתונים ' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send token and user info in the response
        res.json({
            message: 'התחברת בהצלחה',
            token,
            user: { id: user.id, email: user.email, name: user.name },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { loginUser };