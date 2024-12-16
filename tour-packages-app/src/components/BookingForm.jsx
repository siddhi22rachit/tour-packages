// src/components/BookingForm.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { generateInvoicePDF } from '../utils/generatePDF'

const BookingForm = ({ pkg, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    specialRequests: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Generate PDF invoice
    generateInvoicePDF(formData, pkg)

    // Send the booking details to the backend
    try {
      const response = await axios.post('https://tour-packages-ebon.vercel.app/api/bookings', {
        packageId: pkg._id,
        ...formData
      })

      alert('Booking confirmed! Invoice downloaded.')
      onClose()
    } catch (error) {
      alert('Failed to confirm booking. Please try again.')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Book {pkg.title}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          
          <div className="flex items-center space-x-4">
            <label className="w-full">Number of Travelers</label>
            <input
              type="number"
              name="travelers"
              min="1"
              max="10"
              value={formData.travelers}
              onChange={handleChange}
              required
              className="w-20 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          
          <textarea
            name="specialRequests"
            placeholder="Special Requests (Optional)"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default BookingForm
