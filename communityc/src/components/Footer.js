import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>&copy; 2024 ServiceProvider. All rights reserved.</p>
      <div className="space-x-4 mt-2">
        <a href="#" className="hover:text-gray-400">Privacy Policy</a>
        <a href="#" className="hover:text-gray-400">Terms of Service</a>
      </div>
    </footer>
  );
}

export default Footer;
