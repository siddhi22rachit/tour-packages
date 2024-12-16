// src/models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package', // Link to the package the user is booking
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  travelers: {
    type: Number,
    required: true,
    min: 1,
  },
  specialRequests: {
    type: String,
    default: '',
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
