import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Database } from '@sqlitecloud/drivers';
import '../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Database instance, specifying the database directly in the connection string
  const db = new Database('sqlitecloud://clj1pf36iz.sqlite.cloud:8860/communityc.db?apikey=KnYAQAyLUDj36ZRvEhaBfrK52ZQwDba9YiabBQJalb8');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Fetch user data from the database
      const result = await db.sql`
        SELECT * FROM user WHERE username = ${username} AND password = ${password};
      `;

      if (result.length > 0) {
        // Simulate token generation
        const user = result[0];
        const accessToken = 'mock-token'; // Replace with actual token logic

        // Store token in localStorage or sessionStorage
        localStorage.setItem('accessToken', accessToken);

        console.log('Login successful:', user);
        navigate('/'); // Redirect to home page after successful login
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="required block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="required block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button><br /><br />
          <p className="text-gray-600">Don't have an account?
            <Link to='/signup' className="text-blue-500 hover:text-blue-700 font-semibold ml-1">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
