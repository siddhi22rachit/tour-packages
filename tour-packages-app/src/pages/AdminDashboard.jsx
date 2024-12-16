import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('packages');
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isAddPackageModalOpen, setIsAddPackageModalOpen] = useState(false);
  const [newPackageForm, setNewPackageForm] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    availableDates: '',
    image: '',
    highlights: ''
  });

  const API_BASE_URL = 'https://tour-packages-ebon.vercel.app/admin/packages';
  const API_BOOKINGS_URL = 'https://tour-packages-ebon.vercel.app/api/bookings';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packagesResponse = await fetch(API_BASE_URL);
        if (packagesResponse.ok) {
          const packagesData = await packagesResponse.json();
          setPackages(packagesData.data || []);
        } else {
          console.error('Failed to fetch packages');
        }

        const bookingsResponse = await fetch(API_BOOKINGS_URL);
        if (bookingsResponse.ok) {
          const bookingsData = await bookingsResponse.json();
          const bookingsArray = bookingsData.data || bookingsData;
          setBookings(bookingsArray);
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSavePackage = async (e) => {
    e.preventDefault();
    const packageToSave = {
      ...newPackageForm,
      highlights: newPackageForm.highlights.split(',').map((h) => h.trim()),
      availableDates: newPackageForm.availableDates.split(',').map((d) => d.trim()),
    };

    try {
      let response;
      if (selectedPackage) {
        response = await fetch(`${API_BASE_URL}/${selectedPackage._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(packageToSave),
        });
      } else {
        response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(packageToSave),
        });
      }

      if (response.ok) {
        const savedPackage = await response.json();
        if (selectedPackage) {
          setPackages(packages.map((pkg) => pkg._id === selectedPackage._id ? savedPackage.data : pkg));
        } else {
          setPackages([...packages, savedPackage.data]);
        }
        setIsAddPackageModalOpen(false);
        setNewPackageForm({
          title: '',
          description: '',
          price: '',
          duration: '',
          availableDates: '',
          image: '',
          highlights: '',
        });
        setSelectedPackage(null);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditPackage = (pkg) => {
    setSelectedPackage(pkg);
    setNewPackageForm({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      duration: pkg.duration,
      availableDates: pkg.availableDates.join(', '),
      image: pkg.image,
      highlights: pkg.highlights.join(', '),
    });
    setIsAddPackageModalOpen(true);
  };

  const handleDeletePackage = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPackages(packages.filter((pkg) => pkg._id !== id));
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const renderNavbar = () => (
    <div className="flex mb-6 bg-white rounded-xl overflow-hidden shadow-lg">
      <button
        onClick={() => setActiveTab('packages')}
        className={`flex-1 py-4 px-6 text-lg font-semibold transition-all duration-200 ${
          activeTab === 'packages'
            ? 'bg-blue-600 text-white shadow-inner'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        My Packages
      </button>
      <button
        onClick={() => setActiveTab('bookings')}
        className={`flex-1 py-4 px-6 text-lg font-semibold transition-all duration-200 ${
          activeTab === 'bookings'
            ? 'bg-blue-600 text-white shadow-inner'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        My Bookings
      </button>
    </div>
  );

  const renderPackagesContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-xl rounded-xl p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Tour Packages Management
        </h2>
        <button
          onClick={() => setIsAddPackageModalOpen(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          Add Package
        </button>
      </div>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="flex justify-between items-center bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200"
          >
            <span className="text-lg font-medium text-gray-700">{pkg.title}</span>
            <div className="space-x-3">
              <button
                onClick={() => handleEditPackage(pkg)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm hover:shadow"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePackage(pkg._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm hover:shadow"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderBookingsContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-xl rounded-xl p-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Bookings</h2>

      {bookings && bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id || Math.random().toString()}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between">
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-gray-800">
                    {booking.name || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Phone:</span> {booking.phone || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Package:</span>{' '}
                    {(booking.packageId && booking.packageId.title) || 'N/A'}
                  </p>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-lg font-medium text-gray-700">
                    Travelers: {booking.travelers || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleDateString()
                      : 'N/A'}
                  </p>
                  <p className="text-gray-600 max-w-xs truncate">
                    {booking.specialRequests || 'No special requests'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-xl text-gray-600 mb-2">No bookings found</p>
          <p className="text-gray-500">
            New bookings will appear here once they're made
          </p>
        </div>
      )}
    </motion.div>
  );

  const renderAddPackageModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-2xl">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          {selectedPackage ? 'Edit Package' : 'Add New Package'}
        </h3>
        <form onSubmit={handleSavePackage} className="space-y-4">
          <input
            type="text"
            value={newPackageForm.title}
            onChange={(e) =>
              setNewPackageForm((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="Package Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            required
          />
          <textarea
            value={newPackageForm.description}
            onChange={(e) =>
              setNewPackageForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Description"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 min-h-32"
            required
          />
          <input
            type="text"
            value={newPackageForm.price}
            onChange={(e) =>
              setNewPackageForm((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
            placeholder="Price"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            required
          />
          <input
            type="text"
            value={newPackageForm.duration}
            onChange={(e) =>
              setNewPackageForm((prev) => ({
                ...prev,
                duration: e.target.value,
              }))
            }
            placeholder="Duration"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            required
          />
          <input
            type="text"
            value={newPackageForm.availableDates}
            onChange={(e) =>
              setNewPackageForm((prev) => ({
                ...prev,
                availableDates: e.target.value,
              }))
            }
            placeholder="Available Dates (comma separated)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            required
          />
          <input
            type="text"
            value={newPackageForm.image}
            onChange={(e) =>
              setNewPackageForm((prev) => ({
                ...prev,
                image: e.target.value,
              }))
            }
            placeholder="Image URL"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            required
          />
          <input
            type="text"
            value={newPackageForm.highlights}
            onChange={(e) =>
              setNewPackageForm((prev) => ({
                ...prev,
                highlights: e.target.value,
              }))
            }
            placeholder="Highlights (comma separated)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            required
          />
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setIsAddPackageModalOpen(false)}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {renderNavbar()}
        <div className="mt-6">
          {activeTab === 'packages' ? renderPackagesContent() : renderBookingsContent()}
        </div>
        {isAddPackageModalOpen && renderAddPackageModal()}
      </div>
    </div>
  );
};

export default AdminDashboard;