import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const { name } = useParams(); // Assuming you pass the service name in the URL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    additionalInfo: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8">
          Book {name}
        </h1>
        <form className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm md:text-base font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm md:text-base font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm md:text-base font-semibold mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm md:text-base font-semibold mb-2" htmlFor="time">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm md:text-base font-semibold mb-2" htmlFor="additionalInfo">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            <span className="font-semibold text-lg">Book Service</span>
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
