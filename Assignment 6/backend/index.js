const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db.js');

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Middlewares
app.use(express.json()); // Parses incoming JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parses cookies for JWT authentication

// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// API Mounts
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/feedback', feedbackRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('AZ Apparel API is running and secure...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
