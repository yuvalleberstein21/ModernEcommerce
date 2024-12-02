require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadImageRoute = require('./routes/uploadImageRoute');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());


// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/upload_image', uploadImageRoute);



// Error Handling Middleware
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
    });
});




// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));