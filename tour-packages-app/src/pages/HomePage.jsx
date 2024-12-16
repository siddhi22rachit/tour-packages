// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Sun, 
  Plane,  
  Star, 
   
} from 'lucide-react'
import PackageCard from '../components/PackageCard'
import SearchBar from '../components/SearchBar'

const HomePage = () => {
  const [tourPackages, setTourPackages] = useState([]) // State to store fetched packages
  const [filteredPackages, setFilteredPackages] = useState([]) // State for filtered packages
  const [loading, setLoading] = useState(true) // State for loading status
  const [error, setError] = useState('') // State for handling errors

  // Fetch packages data from API when the component mounts
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/packages') // Your API endpoint
        const data = await response.json()
        setTourPackages(data.data) // Assuming the response has a 'data' field containing packages
        setFilteredPackages(data.data) // Set filtered packages to all packages initially
      } catch (error) {
        setError('Failed to load packages')
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  // Handle search filtering
  const handleSearch = (searchTerm) => {
    const filtered = tourPackages.filter(pkg => 
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPackages(filtered)
  }

  // Handle price range filtering
  const handlePriceFilter = (priceRange) => {
    let filtered = tourPackages
    
    switch(priceRange) {
      case '0-1000':
        filtered = tourPackages.filter(pkg => pkg.price >= 0 && pkg.price <= 1000)
        break
      case '1000-2000':
        filtered = tourPackages.filter(pkg => pkg.price > 1000 && pkg.price <= 2000)
        break
      case '2000+':
        filtered = tourPackages.filter(pkg => pkg.price > 2000)
        break
      default:
        filtered = tourPackages
    }
    
    setFilteredPackages(filtered)
  }

  if (loading) {
    return <div className="text-center py-8">Loading packages...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pt-16 pb-16"
    >
      <div className="text-center mb-12">
      <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg"
        >
          <div className="flex justify-center items-center mb-4">
            <Plane className="text-blue-500 mr-4" size={48} />
            <motion.h1 
              className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Discover Amazing Tours
            </motion.h1>
            <Sun className="text-yellow-500 ml-4" size={48} />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg flex items-center justify-center">
            <MapPin className="mr-2 text-red-500" size={24} />
            Explore the world with our curated tour packages
            <Star className="ml-2 text-yellow-500" size={24} />
          </p>
        </motion.div>
      </div>

      <SearchBar 
        onSearch={handleSearch}
        onFilterPrice={handlePriceFilter}
      />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPackages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No packages found. Try a different search or filter.
          </div>
        ) : (
          filteredPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))
        )}
      </motion.div>
    </motion.div>
  )
}

export default HomePage
