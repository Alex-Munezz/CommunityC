import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePay = async () => {
    if (!phoneNumber) {
      alert('Please enter your phone number.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate M-Pesa payment processing
      // Replace this with actual API call to process the payment
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to booked-service page
      navigate('/booked-service');
    } catch (error) {
      console.error('Payment failed', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Checkout</h1>
        <p className="text-gray-700 mb-6 text-center">
          Please enter your phone number to proceed with payment via M-Pesa.
        </p>
        <div className="mb-6">
          <label htmlFor="phoneNumber" className="block text-gray-600 mb-2">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="e.g., 0701234567"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handlePay}
          className={`w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay with M-Pesa'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
