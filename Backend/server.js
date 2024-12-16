import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authAdminRoutes from './routes/authAdminRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admin', authAdminRoutes);
app.use('/admin', adminRoutes);
app.use('/api', bookingRoutes);



// Connect to MongoDB and Start Server
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
