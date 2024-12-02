// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected...');
//     } catch (err) {
//         console.error(`Error: ${err.message}`);
//         process.exit(1); // Exit with failure
//     }
// };

// module.exports = connectDB;

const connectDB = async () => {
    console.log('Using fake data for development...');
};

module.exports = connectDB;