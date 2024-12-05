const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully 🌐✅');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};



// const connectDB = async () => {
//     console.log('Using fake data for development...');
// };

module.exports = connectDB;