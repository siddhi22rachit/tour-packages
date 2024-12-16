// src/routes/bookingRoutes.js
import express from 'express';
import { createBooking, getAllBookings, getBookingById } from '../controllers/bookingController.js';

const router = express.Router();

// POST route to create a booking
router.post('/bookings', createBooking);

// GET route to get all bookings
router.get('/bookings', getAllBookings);

// GET route to get a specific booking by ID
router.get('/bookings/:id', getBookingById);

export default router;
