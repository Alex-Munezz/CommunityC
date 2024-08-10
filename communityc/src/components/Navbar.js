import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getLinkClassName = (path) => 
    `text-gray-300 hover:text-white ${location.pathname === path ? 'hidden' : ''}`;

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="h-14" />
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className={getLinkClassName("/")}>Home</Link>
          <Link to="/login" className={getLinkClassName("/login")}>Login</Link>
          <Link to="/signup" className={getLinkClassName("/signup")}>Sign Up</Link>
          <Link to="/about" className={getLinkClassName("/about")}>About Us</Link>
          <Link to="/contacts" className={getLinkClassName("/contacts")}>Contact Us</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-700 p-4 space-y-4">
          <Link to="/" className={`block text-gray-300 hover:text-white ${location.pathname === "/" ? 'hidden' : ''}`}>Home</Link>
          <Link to="/about" className={`block text-gray-300 hover:text-white ${location.pathname === "/about" ? 'hidden' : ''}`}>About Us</Link>
          <Link to="/contacts" className={`block text-gray-300 hover:text-white ${location.pathname === "/contacts" ? 'hidden' : ''}`}>Contact US</Link>
          <Link to="/login" className={`block text-gray-300 hover:text-white ${location.pathname === "/login" ? 'hidden' : ''}`}>Login</Link>
          <Link to="/signup" className={`block text-gray-300 hover:text-white ${location.pathname === "/signup" ? 'hidden' : ''}`}>Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
