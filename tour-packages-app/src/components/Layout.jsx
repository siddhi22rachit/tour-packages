// src/components/Layout.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  Plane, 
  MapPin, 
  Globe, 
  Sun,
  Instagram,
  Twitter,
  Facebook 
} from 'lucide-react'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50"
      >
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Plane className="text-blue-600" size={30} />
            <Link 
              to="/" 
              className="text-2xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              TravelWiz
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-6"
          >
            <nav className="flex space-x-4 items-center">
              <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition">
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link to="/admin/signup" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition">
                <Globe size={20} />
                <span>sing up as admin</span>
              </Link>
             
            </nav>
          </motion.div>
        </nav>
      </motion.header >
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-grow pt-20 container mx-auto px-4 py-8"
      >
        {children}
      </motion.main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Plane className="mr-2 text-blue-400" />
              TravelWiz
            </h3>
            <p className="text-gray-300">
              Discover the world with our curated travel experiences. 
              Your journey begins here.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="#" className="hover:text-blue-400">Packages</Link></li>
              <li><Link to="#" className="hover:text-blue-400">About Us</Link></li>
              <li><Link to="#" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link to="#" className="hover:text-blue-400">
                <Instagram />
              </Link>
              <Link to="#" className="hover:text-blue-400">
                <Twitter />
              </Link>
              <Link to="#" className="hover:text-blue-400">
                <Facebook />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 border-t border-gray-800 pt-4">
          <p>&copy; 2024 TravelWiz. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout