import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmed</h1>
      <p className="mb-4">Your booking has been successfully completed. A confirmation email will be sent to you shortly.</p>
      <button
        onClick={handleGoBack}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Back to Landing Page
      </button>
    </div>
  );
};

export default ConfirmationPage;
