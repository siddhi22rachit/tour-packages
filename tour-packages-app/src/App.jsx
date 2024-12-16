// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import 'antd/dist/reset.css';
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PackageDetailPage from './pages/PackageDetailPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminSignUp from './pages/AdminSignup'
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/package/:id" element={<PackageDetailPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Layout>
  )
}

export default App