// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// function LandingPage() {
//   const [services, setServices] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showPopup, setShowPopup] = useState(true);
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     const fetchServicesAndCategories = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:5000/services');
//         if (!response.ok) {
//           throw new Error('Failed to fetch services');
//         }

//         const data = await response.json();
        
//         if (data && Array.isArray(data.services)) {
//           setServices(data.services);
//         }

//         if (data && Array.isArray(data.categories)) {
//           setCategories(data.categories);
//         }

//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchServicesAndCategories();
//   }, []);

//   useEffect(() => {
//     if (showPopup) {
//       const timer = setTimeout(() => {
//         setShowPopup(false);
//       }, 5000); // 10 seconds

//       return () => clearTimeout(timer);
//     }
//   }, [showPopup]);

//   const handleCategoryChange = (e) => {
//     const { value } = e.target;
//     setSelectedCategories(prevCategories =>
//       prevCategories.includes(value)
//         ? prevCategories.filter(cat => cat !== value)
//         : [...prevCategories, value]
//     );
//   };

//   const handleBookService = (service) => {
//     if (isAuthenticated) {
//       navigate(`/book/${service.name}`);
//     } else {
//       navigate('/login');
//     }
//   };

//   const filteredServices = selectedCategories.length
//     ? services.filter(service => selectedCategories.includes(service.category))
//     : services;

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="text-center">
//           <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
//           <p className="mt-4 text-gray-700">Loading services...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center mt-4 text-red-600">Error: {error}</div>;
//   }

//   return (
//     <div className="bg-gradient-to-r from-black via-blue-500 to-gray-200 relative">
//       <header className="text-center py-16">
//         <h1 className="text-4xl text-white font-bold font-serif">Welcome to CommunityCrafters</h1>
//         <p className="mt-4 text-2xl text-white">Find the best local services for your needs.</p>
//       </header>
      
//       <div className="container mx-auto py-8">
//         <h2 className="text-3xl font-serif text-center text-white mb-6">Services We Provide :</h2>

//         {/* Category Selection */}
//         <div className="container mx-auto py-8">
//           <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//             <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">Filter by Category</h3>
//             <div className="flex flex-wrap justify-center gap-6">
//               {categories.map(category => (
//                 <label
//                   key={category}
//                   className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     value={category}
//                     checked={selectedCategories.includes(category)}
//                     onChange={handleCategoryChange}
//                     className="form-checkbox h-5 w-5 text-blue-500 transition duration-150 ease-in-out"
//                   />
//                   <span className="text-lg font-medium text-gray-800">{category}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredServices.map(service => (
//             <div key={service.id} className="bg-white shadow-md rounded-lg overflow-hidden">
//               <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h3 className="text-xl font-bold mb-2">{service.name}</h3>
//                 <p className="text-gray-600 mb-4">{service.description}</p>
//                 <button
//                   onClick={() => handleBookService(service)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                   Book Service
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Database } from '@sqlitecloud/drivers';

// Initialize the database outside of the component
const db = new Database("sqlitecloud://clj1pf36iz.sqlite.cloud:8860/communityc.db?apikey=KnYAQAyLUDj36ZRvEhaBfrK52ZQwDba9YiabBQJalb8");

function LandingPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchServicesAndCategories = async () => {
      try {
        // Fetch all services from the database
        const servicesResult = await db.sql`SELECT * FROM service;`;
        console.log('Services result:', servicesResult); // Log the services response

        // Fetch distinct categories from services
        const categoriesResult = await db.sql`SELECT DISTINCT category FROM service;`;
        console.log('Categories result:', categoriesResult); // Log the categories response

        // Update state with fetched services
        if (servicesResult && Array.isArray(servicesResult)) {
          setServices(servicesResult);
        }

        // Extract categories from the result and update state
        if (categoriesResult && Array.isArray(categoriesResult)) {
          const categoriesList = categoriesResult.map(item => item.category);
          setCategories(categoriesList);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'An unexpected error occurred.');
        setLoading(false);
      }
    };

    fetchServicesAndCategories();
  }, []);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setSelectedCategories(prevCategories =>
      prevCategories.includes(value)
        ? prevCategories.filter(cat => cat !== value)
        : [...prevCategories, value]
    );
  };

  const handleBookService = (service) => {
    if (isAuthenticated) {
      navigate(`/book/${service.name}`);
    } else {
      navigate('/login');
    }
  };

  const filteredServices = selectedCategories.length
    ? services.filter(service => selectedCategories.includes(service.category))
    : services;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-700">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-black via-blue-500 to-gray-200 relative">
      {/* Popup Notification */}
      {showPopup && (
        <div className="absolute top-0 left-0 right-0 bg-yellow-400 text-center py-2">
          <p>Welcome to CommunityCrafters!</p>
        </div>
      )}

      <header className="text-center py-16">
        <h1 className="text-4xl text-white font-bold font-serif">Welcome to CommunityCrafters</h1>
        <p className="mt-4 text-2xl text-white">Find the best local services for your needs.</p>
      </header>
      
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-serif text-center text-white mb-6">Services We Provide:</h2>

        {/* Category Selection */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">Filter by Category</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map(category => (
              <label
                key={category}
                className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                  className="form-checkbox h-5 w-5 text-blue-500 transition duration-150 ease-in-out"
                />
                <span className="text-lg font-medium text-gray-800">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {filteredServices.map(service => (
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
