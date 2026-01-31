import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authROutes.js';
import noteRoutes from './routes/noteRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows frontend to communicate with backend
app.use(express.json()); // Parses incoming JSON requests

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Basic Home Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});