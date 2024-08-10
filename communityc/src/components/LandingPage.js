import React from 'react';
import { useNavigate } from 'react-router-dom';
import plumbing from '../images/image1.jpeg';
import electrician from '../images/image2.jpg';
import chauffer from '../images/image8.jpg';
import braiding from '../images/image5.webp';

const services = [
  { id: 1, name: 'Plumbing', description: 'Fix your plumbing issues.', image: plumbing },
  { id: 2, name: 'Electrician', description: 'Electrical services for your home.', image: electrician },
  { id: 3, name: 'Chauffeur', description: 'Hire a professional driver.', image: chauffer },
  { id: 4, name: 'Braiding', description: 'Braiding services for your hair.', image: braiding },
];

function LandingPage() {
  const navigate = useNavigate();

  const handleBookService = (service) => {
    navigate(`/book/${service.name}`);
  };

  return (
    <div>
      <header className="bg-blue-500 text-white text-center py-16">
        <h1 className="text-4xl font-bold">Welcome to CommunityCrafters</h1>
        <p className="mt-4">Find the best local services for your needs.</p>
      </header>
      
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(service => (
            <div key={service.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button
                  onClick={() => handleBookService(service)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
