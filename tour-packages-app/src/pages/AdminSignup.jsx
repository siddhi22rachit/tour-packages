import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  User, 
  Lock, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight 
} from 'lucide-react';

const AdminSignUp = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/signup', credentials);
      setMessage('Admin created successfully');
      navigate('/admin/login');
    } catch (err) {
      setMessage('Error creating admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl flex bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-8">
              <UserPlus className="text-purple-600 mr-4" size={48} />
              <h1 className="text-3xl font-bold text-gray-800">Admin Sign Up</h1>
            </div>
            
            {message && (
              <motion.p 
                initial={{ x: -10 }}
                animate={{ x: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className={`mb-4 flex items-center ${
                  message.includes('successfully') 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}
              >
                {message.includes('successfully') ? (
                  <CheckCircle className="mr-2" />
                ) : (
                  <AlertTriangle className="mr-2" />
                )}
                {message}
              </motion.p>
            )}
            
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-10 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
                  required
                  minLength={6}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:opacity-90 flex items-center justify-center"
              >
                Sign Up <ArrowRight className="ml-2" />
              </motion.button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/admin/login" 
                  className="text-purple-600 hover:underline font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
        
        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white p-8">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-4">Create Your Account</h2>
              <p className="text-xl">Join our admin platform and manage your tours</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSignUp;