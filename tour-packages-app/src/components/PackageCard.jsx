// src/components/PackageCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, DollarSign } from 'lucide-react'

const PackageCard = ({ pkg }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800 truncate">{pkg.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2 text-blue-500" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2 text-green-500" />
            <span>{pkg.availableDates[0]}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign size={16} className="mr-2 text-purple-500" />
            <span>{pkg.price} per person</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link 
            to={`/package/${pkg._id}`} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Explore Package
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default PackageCard