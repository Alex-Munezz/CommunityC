import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import BookingPage from './components/BookingPage';
import BookedServicePage from './components/BookedServicePage';
import CheckOut from './components/Checkout';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/book/:name" element={<BookingPage />} />
            <Route path="/booked-service" element={<BookedServicePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
