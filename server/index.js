require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadImageRoute = require('./routes/uploadImageRoute');
const { notFound, errorHandler } = require('./middleware/Errors');

const app = express();



// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(helmet());


// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload_image', uploadImageRoute);


app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));