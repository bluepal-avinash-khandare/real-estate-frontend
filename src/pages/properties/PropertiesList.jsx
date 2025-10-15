// import React, { useState, useEffect } from 'react';
// import { getProperties } from '../../services/propertyService';
// import Card from '../../components/common/Card';
// import Filter from '../../components/common/Filter';

// const PropertiesList = () => {
//   const [properties, setProperties] = useState([]);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     const fetchProperties = async () => {
//       const data = await getProperties({ q: filter });
//       setProperties(data.data.content);
//     };
//     fetchProperties();
//   }, [filter]);

//   const handleFilterChange = (e) => setFilter(e.target.value);

//   return (
//     <div>
//       <Filter onChange={handleFilterChange} placeholder="Search Properties" />
//       {properties.map((prop) => (
//         <Card key={prop.id} title={prop.title} description={prop.description} />
//       ))}
//     </div>
//   );
// };

// export default PropertiesList;


// import React, { useState, useEffect } from 'react';
// import { getProperties } from '../../services/propertyService';
// import Card from '../../components/common/Card';
// import Filter from '../../components/common/Filter';

// const PropertiesList = () => {
//   const [properties, setProperties] = useState([]);
//   const [filter, setFilter] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       setLoading(true);
//       try {
//         const data = await getProperties({ q: filter });
//         setProperties(data.data.content || []);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch properties');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperties();
//   }, [filter]);

//   const handleFilterChange = (e) => setFilter(e.target.value);

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   // Calculate statistics
//   const totalProperties = properties.length;
//   const availableProperties = properties.filter(prop => prop.status === 'available').length;
//   const averagePrice = properties.length > 0 
//     ? properties.reduce((sum, prop) => sum + (prop.price || 0), 0) / properties.length 
//     : 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
//             Property Listings
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Discover your perfect property from our extensive collection of homes, apartments, and commercial spaces
//           </p>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-blue-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Properties</p>
//                 <p className="text-2xl font-bold text-gray-900">{totalProperties}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-green-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Available Now</p>
//                 <p className="text-2xl font-bold text-gray-900">{availableProperties}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-yellow-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Average Price</p>
//                 <p className="text-2xl font-bold text-gray-900">{formatCurrency(averagePrice)}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">All Properties</h2>
//               <p className="text-gray-600 mt-1">Browse our collection of premium properties</p>
//             </div>
//             <div className="mt-4 md:mt-0">
//               <div className="relative rounded-md shadow-sm max-w-xs">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <Filter 
//                   onChange={handleFilterChange} 
//                   placeholder="Search properties..." 
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085]"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Properties Grid */}
//           <div className="overflow-x-auto">
//             {loading ? (
//               <div className="flex justify-center items-center py-20">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A085]"></div>
//               </div>
//             ) : error ? (
//               <div className="bg-red-50 border-l-4 border-red-500 p-6 m-6 rounded">
//                 <div className="flex">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm text-red-700">{error}</p>
//                   </div>
//                 </div>
//               </div>
//             ) : properties.length === 0 ? (
//               <div className="text-center py-16">
//                 <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5z" />
//                 </svg>
//                 <h3 className="mt-4 text-lg font-medium text-gray-900">No properties found</h3>
//                 <p className="mt-1 text-gray-500 max-w-md mx-auto">
//                   {filter ? 'No properties match your search criteria.' : 'There are no properties available at the moment.'}
//                 </p>
//                 <div className="mt-6">
//                   <button
//                     onClick={() => setFilter('')}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]"
//                   >
//                     {filter ? 'Clear Search' : 'Check Back Later'}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {properties.map((prop) => (
//                   <div key={prop.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//                     {/* Property Image */}
//                     <div className="h-48 bg-gray-200 relative">
//                       {prop.imageUrl ? (
//                         <img 
//                           src={prop.imageUrl} 
//                           alt={prop.title} 
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-gray-100">
//                           <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                         </div>
//                       )}
//                       <div className="absolute top-4 right-4">
//                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                           prop.status === 'available' ? 'bg-green-100 text-green-800' : 
//                           prop.status === 'sold' ? 'bg-red-100 text-red-800' : 
//                           'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {prop.status || 'Available'}
//                         </span>
//                       </div>
//                     </div>
                    
//                     {/* Property Details */}
//                     <div className="p-6">
//                       <div className="flex justify-between items-start">
//                         <h3 className="text-lg font-bold text-gray-900 mb-2">{prop.title}</h3>
//                         <span className="text-lg font-bold text-[#16A085]">
//                           {prop.price ? formatCurrency(prop.price) : 'Price not set'}
//                         </span>
//                       </div>
                      
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                         {prop.description || 'No description available'}
//                       </p>
                      
//                       <div className="flex items-center text-sm text-gray-500 mb-4">
//                         <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         {prop.location || 'Location not specified'}
//                       </div>
                      
//                       <div className="flex justify-between items-center">
//                         <div className="flex space-x-2">
//                           {prop.bedrooms && (
//                             <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
//                               {prop.bedrooms} beds
//                             </span>
//                           )}
//                           {prop.bathrooms && (
//                             <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
//                               {prop.bathrooms} baths
//                             </span>
//                           )}
//                           {prop.area && (
//                             <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
//                               {prop.area} sq ft
//                             </span>
//                           )}
//                         </div>
                        
//                         <button className="text-[#16A085] hover:text-[#138871] text-sm font-medium">
//                           View Details
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Additional Information */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-blue-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9c.5 0 1 0 0 2m0-2c-.5 0-1 0-1 2m0-2V3m0 18v-3m0 0h3" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Wide Selection</h3>
//             </div>
//             <p className="text-gray-600">Choose from thousands of properties in prime locations across the country.</p>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-green-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Verified Listings</h3>
//             </div>
//             <p className="text-gray-600">All properties are verified by our team to ensure accuracy and authenticity.</p>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-purple-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25A9.75 9.75 0 0021.75 12 9.75 9.75 0 0012 2.25zm0 0A9.75 9.75 0 102.25 12 9.75 9.75 0 0012 2.25z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Expert Support</h3>
//             </div>
//             <p className="text-gray-600">Our team of real estate experts is available to help you find your perfect property.</p>
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="mt-8 text-center text-gray-500 text-sm">
//           <p>Can't find what you're looking for? Contact us for personalized assistance.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertiesList;


import React, { useState, useEffect } from 'react';
import { getProperties } from '../../services/propertyService';
import Card from '../../components/common/Card';
import Filter from '../../components/common/Filter';
import { Link } from 'react-router-dom';

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await getProperties({ q: filter });
        setProperties(data.data.content || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [filter]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate statistics
  const totalProperties = properties.length;
  const availableProperties = properties.filter(prop => prop.status === 'available').length;
  const averagePrice = properties.length > 0 
    ? properties.reduce((sum, prop) => sum + (prop.price || 0), 0) / properties.length 
    : 0;

  // Fallback image component
  const FallbackImage = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Property Listings
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your perfect property from our extensive collection of homes, apartments, and commercial spaces
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{totalProperties}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Available Now</p>
                <p className="text-2xl font-bold text-gray-900">{availableProperties}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Average Price</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(averagePrice)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">All Properties</h2>
              <p className="text-gray-600 mt-1">Browse our collection of premium properties</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative rounded-md shadow-sm max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <Filter 
                  onChange={handleFilterChange} 
                  placeholder="Search properties..." 
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085]"
                />
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A085]"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 m-6 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-16">
                <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No properties found</h3>
                <p className="mt-1 text-gray-500 max-w-md mx-auto">
                  {filter ? 'No properties match your search criteria.' : 'There are no properties available at the moment.'}
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setFilter('')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]"
                  >
                    {filter ? 'Clear Search' : 'Check Back Later'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((prop) => {
                  // Check if images exist and get the first image URL
                  const hasImages = prop.images && prop.images.length > 0;
                  const imageUrl = hasImages ? prop.images[0].url : null;
                  
                  return (
                    <div key={prop.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                      {/* Property Image */}
                      <div className="h-48 bg-gray-200 relative">
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            alt={prop.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // If image fails to load, replace with fallback
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `
                                <div class="w-full h-full flex items-center justify-center bg-gray-100">
                                  <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              `;
                            }}
                          />
                        ) : (
                          <FallbackImage />
                        )}
                        <div className="absolute top-4 right-4">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            prop.status === 'available' ? 'bg-green-100 text-green-800' : 
                            prop.status === 'sold' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {prop.status || 'Available'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Property Details */}
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{prop.title}</h3>
                          <span className="text-lg font-bold text-[#16A085]">
                            {prop.price ? formatCurrency(prop.price) : 'Price not set'}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {prop.description || 'No description available'}
                        </p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {prop.address || 'Location not specified'}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            {prop.bedrooms && (
                              <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                                {prop.bedrooms} beds
                              </span>
                            )}
                            {prop.bathrooms && (
                              <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                                {prop.bathrooms} baths
                              </span>
                            )}
                            {prop.area && (
                              <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                                {prop.area} sq ft
                              </span>
                            )}
                          </div>
                          
                          <Link to={`/properties/${prop.id}`}>
                          <button className="text-[#16A085] hover:text-[#138871] text-sm font-medium">
                            View Details
                          </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9c.5 0 1 0 0 2m0-2c-.5 0-1 0-1 2m0-2V3m0 18v-3m0 0h3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Wide Selection</h3>
            </div>
            <p className="text-gray-600">Choose from thousands of properties in prime locations across the country.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Verified Listings</h3>
            </div>
            <p className="text-gray-600">All properties are verified by our team to ensure accuracy and authenticity.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25A9.75 9.75 0 0021.75 12 9.75 9.75 0 0012 2.25zm0 0A9.75 9.75 0 102.25 12 9.75 9.75 0 0012 2.25z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Expert Support</h3>
            </div>
            <p className="text-gray-600">Our team of real estate experts is available to help you find your perfect property.</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Can't find what you're looking for? Contact us for personalized assistance.</p>
        </div>
      </div>
    </div>
  );
};

export default PropertiesList;