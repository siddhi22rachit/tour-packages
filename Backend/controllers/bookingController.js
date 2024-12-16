// src/controllers/bookingController.js
import Booking from '../models/Booking.js';


export const createBooking = async (req, res) => {
  const { packageId, name, email, phone, travelers, specialRequests } = req.body;

  try {
    const newBooking = new Booking({
      packageId,
      name,
      email,
      phone,
      travelers,
      specialRequests,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: 'Booking confirmed!', booking: savedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save booking', error });
  }
};
// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('packageId', 'title');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve bookings', error });
  }
};


// Get a specific booking by ID
export const getBookingById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const booking = await Booking.findById(id).populate('packageId', 'title');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve booking', error });
  }
};