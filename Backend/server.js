import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authAdminRoutes from './routes/authAdminRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();

// CORS configuration to allow requests from the frontend URL
const corsOptions = {
  origin: 'https://tour-packages-b1n3.vercel.app', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Include this if you're dealing with cookies or authentication headers
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use('/api/admin', authAdminRoutes);
app.use('/admin', adminRoutes);
app.use('/api', bookingRoutes);

// Connect to MongoDB and Start Server
connectDB();
const PORT = process.env.PORT || 5000;

// Vercel expects the handler to be exported for serverless functions
export default function handler(req, res) {
  app(req, res);
}
