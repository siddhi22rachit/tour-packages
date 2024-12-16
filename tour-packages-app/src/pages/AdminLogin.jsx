import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  LogIn, 
  User, 
  Lock, 
  ArrowRight 
} from 'lucide-react';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://tour-packages-ebon.vercel.app/api/admin/login', credentials);
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl flex bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="hidden md:block w-1/2 relative">
         
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white p-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-xl">Sign in to access your admin dashboard</p>
            </motion.div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-8">
              <LogIn className="text-blue-600 mr-4" size={48} />
              <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
            </div>
            
            {error && (
              <motion.p 
                initial={{ x: -10 }}
                animate={{ x: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-red-500 mb-4 flex items-center"
              >
                <Lock className="mr-2 text-red-500" /> {error}
              </motion.p>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-10 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 flex items-center justify-center"
              >
                Login <ArrowRight className="ml-2" />
              </motion.button>
            </form>
            
            <p className="text-center text-sm mt-6 text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/admin/signup" 
                className="text-blue-600 hover:underline font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;