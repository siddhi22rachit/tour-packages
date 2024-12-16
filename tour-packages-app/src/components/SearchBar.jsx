// src/components/SearchBar.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SearchBar = ({ onSearch, onFilterPrice }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('')

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  const handlePriceFilter = (e) => {
    const price = e.target.value
    setPriceFilter(price)
    onFilterPrice(price)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row gap-4 mb-8"
    >
      <input 
        type="text" 
        placeholder="Search packages..." 
        value={searchTerm}
        onChange={handleSearch}
        className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
      />
      <select 
        value={priceFilter}
        onChange={handlePriceFilter}
        className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
      >
        <option value="">All Prices</option>
        <option value="0-1000">$0 - $1000</option>
        <option value="1000-2000">$1000 - $2000</option>
        <option value="2000+">$2000+</option>
      </select>
    </motion.div>
  )
}

export default SearchBar