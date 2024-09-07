import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState(null); // Track token expiry
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const expiry = localStorage.getItem('token_expiry');
    
    if (token && expiry && new Date(expiry) > new Date()) {
      setIsAuthenticated(true);
    } else {
      logout(); // If token is expired, log out the user
    }
  }, []);

  useEffect(() => {
    // Automatically log out the user if token expires
    if (isAuthenticated && tokenExpiry) {
      const interval = setInterval(() => {
        if (new Date() > new Date(tokenExpiry)) {
          logout();
        }
      }, 1000); // Check every second

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [isAuthenticated, tokenExpiry]);

  const login = (token) => {
    const expiryTime = new Date(new Date().getTime() + 30 * 60 * 1000); 
    localStorage.setItem('access_token', token);
    localStorage.setItem('token_expiry', expiryTime.toISOString()); // Store expiration time
    setIsAuthenticated(true);
    setTokenExpiry(expiryTime);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_expiry');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
