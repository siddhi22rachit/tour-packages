// src/pages/PackageDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookingForm from '../components/BookingForm';

const PackageDetailPage = () => {
  const { id } = useParams(); // Get package ID from the URL
  const [pkg, setPkg] = useState(null); // State to store fetched package data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error handling state
  const [showBookingForm, setShowBookingForm] = useState(false); // Handle booking form visibility

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/packages/${id}`); // Fetch package by ID
        const data = await response.json();
        if (response.ok) {
          setPkg(data); // Set the fetched package data
        } else {
          setError('Package not found');
        }
      } catch (err) {
        setError('Failed to fetch package details');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPackageDetails();
  }, [id]); // Re-run the fetch when the `id` changes

  if (loading) return <div>Loading package details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4">
      {pkg && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div>
            <img 
              src={pkg.image} 
              alt={pkg.title} 
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-4">{pkg.title}</h1>
            <p className="text-gray-600 mb-6">{pkg.description}</p>
            
            <div className="bg-gray-100 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Package Details</h2>
              <ul className="space-y-2">
                <li>
                  <strong>Duration:</strong> {pkg.duration}
                </li>
                <li>
                  <strong>Price:</strong> ${pkg.price} per person
                </li>
                <li>
                  <strong>Available Dates:</strong> 
                  {pkg.availableDates.map(date => (
                    <span key={date} className="ml-2 text-black px-2 py-1 rounded text-sm">
                      {date}
                    </span>
                  ))}
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Highlights</h3>
              <ul className="list-disc list-inside space-y-2">
                {pkg.highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-700">{highlight}</li>
                ))}
              </ul>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBookingForm(true)}
              className="mt-8 w-full bg-brand-secondary text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Book Now
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Show booking form when clicked */}
      {showBookingForm && (
        <BookingForm 
          pkg={pkg} 
          onClose={() => setShowBookingForm(false)} 
        />
      )}
    </div>
  );
};

export default PackageDetailPage;
