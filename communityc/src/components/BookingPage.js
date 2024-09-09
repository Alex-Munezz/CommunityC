import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const BookingPage = () => {
  const { name } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service_name: name || '',
    date: '',
    time: '',
    additionalInfo: '',
    serviceType: '',
    price: 0,
  });

  const [servicePricing, setServicePricing] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fetchServicePricing = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/service-pricing?service_name=${formData.service_name}`);
      if (!response.ok) throw new Error('Failed to fetch pricing info');
      const data = await response.json();
      setServicePricing(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (formData.service_name) {
      fetchServicePricing();
    }
  }, [formData.service_name]);

  useEffect(() => {
    if (formData.serviceType && servicePricing[formData.serviceType]) {
      setFormData((prevData) => ({
        ...prevData,
        price: servicePricing[formData.serviceType] || 0,
      }));
    }
  }, [formData.serviceType, servicePricing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(''); // Clear the error when form changes
  };

  const validateDateAndTime = () => {
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset today's time to 00:00:00

    if (selectedDate < today) {
      return 'You cannot book a past date.';
    }

    if (selectedDate.getTime() === today.getTime()) {
      return 'You cannot book for today. Please choose a future date.';
    }

    const selectedTime = formData.time;
    const selectedHours = parseInt(selectedTime.split(':')[0], 10);

    if (selectedHours < 7 || selectedHours >= 20) {
      return 'Booking is only allowed between 7:00 AM and 8:00 PM.';
    }

    return ''; // No validation errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateDateAndTime();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const price = formData.price;
      localStorage.setItem('booking_price', price);
      navigate('/checkout');
    } catch (error) {
      console.error('Error setting booking price:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Book {formData.service_name}</h1>
        <form className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}
          <div className="mb-6">
            <label className="required block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="required block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="required block text-gray-700 text-sm font-semibold mb-2" htmlFor="service_name">
              Service Name
            </label>
            <input
              type="text"
              id="service_name"
              name="service_name"
              value={formData.service_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="required block text-gray-700 text-sm font-semibold mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="required block text-gray-700 text-sm font-semibold mb-2" htmlFor="time">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="required block text-gray-700 text-sm font-semibold mb-2" htmlFor="serviceType">
              Service Difficulty
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            >
              <option value="" disabled>Select Service Difficulty</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard/Complex</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="price">
              Price (in Kshs)
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={`${formData.price.toFixed(2)}`}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="additionalInfo">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Book Service
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
