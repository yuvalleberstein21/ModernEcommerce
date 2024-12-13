require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadImageRoute = require('./routes/uploadImageRoute');
const { notFound, errorHandler } = require('./middleware/Errors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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


app.use(notFound);
app.use(errorHandler);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));