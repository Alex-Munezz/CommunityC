import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const SignUp = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false); // New state for checkbox
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!fullname || !email || !phoneNumber || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    } else if (!agreedToTerms) { // Check if terms are agreed
      setError('You must agree to the terms and conditions.');
      return;
    }

    try {
      // Send a POST request to your Flask backend on localhost
      const response = await fetch('http://127.0.0.1:5000/create_account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname,
          email,
          phone_number: phoneNumber,
          password
        }),
      });

      if (response.ok) {
        setError('');
        navigate('/login'); // Redirect to login page after successful sign-up
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Sign-up failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during sign-up:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="required block text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your 2 full names"
              required
            />
          </div>
          <div className="mb-4">
            <label className="required block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="required block text-gray-700">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="required block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="required block text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="required text-gray-700">
              I agree to the <Link to="/terms" className="text-blue-500 hover:text-blue-700">CommunityCrafters Terms and Conditions</Link>
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
          <br /><br />
          <p className="text-gray-600">Have an account?
            <Link to='/login' className="text-blue-500 hover:text-blue-700 font-semibold ml-1">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
