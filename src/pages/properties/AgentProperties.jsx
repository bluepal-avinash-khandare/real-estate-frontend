// // import React, { useState, useEffect, useContext } from 'react';
// // import { getAgentProperties } from '../../services/propertyService';
// // import { AuthContext } from '../../contexts/AuthContext';
// // import Card from '../../components/common/Card';

// // const AgentProperties = () => {
// //   const { user } = useContext(AuthContext);
// //   const [properties, setProperties] = useState([]);

// //   useEffect(() => {
// //     const fetchProperties = async () => {
// //       const data = await getAgentProperties(user.id);
// //       setProperties(data.data);
// //     };
// //     fetchProperties();
// //   }, [user.id]);

// //   return (
// //     <div>
// //       {properties.map((prop) => (
// //         <Card key={prop.id} title={prop.title} description={prop.description} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default AgentProperties;


// import React, { useState, useEffect, useContext } from 'react';
// import { getAgentProperties } from '../../services/propertyService';
// import { AuthContext } from '../../contexts/AuthContext';
// import Card from '../../components/common/Card';

// const AgentProperties = () => {
//   const { user } = useContext(AuthContext);
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       setLoading(true);
//       try {
//         const data = await getAgentProperties(user.id);
//         setProperties(data.data || []);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch properties');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperties();
//   }, [user.id]);

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
//             Your Property Listings
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Manage and showcase all your properties in one place
//           </p>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-blue-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Properties</p>
//                 <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
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
//                 <p className="text-sm font-medium text-gray-600">Active Listings</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {properties.filter(p => p.status === 'active').length}
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-yellow-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Pending Approval</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {properties.filter(p => p.status === 'pending').length}
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-purple-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Value</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {formatCurrency(properties.reduce((sum, prop) => sum + (prop.price || 0), 0))}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Properties Grid */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">All Properties</h2>
//             <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]">
//               Add New Property
//             </button>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center py-20">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A085]"></div>
//             </div>
//           ) : error ? (
//             <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//               </div>
//             </div>
//           ) : properties.length === 0 ? (
//             <div className="text-center py-16">
//               <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5z" />
//               </svg>
//               <h3 className="mt-4 text-lg font-medium text-gray-900">No properties found</h3>
//               <p className="mt-1 text-gray-500 max-w-md mx-auto">
//                 You haven't added any properties yet. Get started by adding your first property listing.
//               </p>
//               <div className="mt-6">
//                 <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]">
//                   Add Your First Property
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {properties.map((prop) => (
//                 <div key={prop.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//                   {/* Property Image */}
//                   <div className="h-48 bg-gray-200 relative">
//                     {prop.imageUrl ? (
//                       <img 
//                         src={prop.imageUrl} 
//                         alt={prop.title} 
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center bg-gray-100">
//                         <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                         </svg>
//                       </div>
//                     )}
//                     <div className="absolute top-4 right-4">
//                       <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                         prop.status === 'active' ? 'bg-green-100 text-green-800' : 
//                         prop.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
//                         'bg-gray-100 text-gray-800'
//                       }`}>
//                         {prop.status || 'Active'}
//                       </span>
//                     </div>
//                   </div>
                  
//                   {/* Property Details */}
//                   <div className="p-6">
//                     <div className="flex justify-between items-start">
//                       <h3 className="text-lg font-bold text-gray-900 mb-2">{prop.title}</h3>
//                       <span className="text-lg font-bold text-[#16A085]">
//                         {prop.price ? formatCurrency(prop.price) : 'Price not set'}
//                       </span>
//                     </div>
                    
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       {prop.description || 'No description available'}
//                     </p>
                    
//                     <div className="flex items-center text-sm text-gray-500 mb-4">
//                       <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                       </svg>
//                       {prop.location || 'Location not specified'}
//                     </div>
                    
//                     <div className="flex justify-between items-center">
//                       <div className="flex space-x-2">
//                         {prop.bedrooms && (
//                           <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
//                             {prop.bedrooms} beds
//                           </span>
//                         )}
//                         {prop.bathrooms && (
//                           <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
//                             {prop.bathrooms} baths
//                           </span>
//                         )}
//                         {prop.area && (
//                           <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
//                             {prop.area} sq ft
//                           </span>
//                         )}
//                       </div>
                      
//                       <button className="text-[#16A085] hover:text-[#138871] text-sm font-medium">
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Additional Information */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-blue-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Easy Management</h3>
//             </div>
//             <p className="text-gray-600">Update property details, photos, and pricing with just a few clicks.</p>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-green-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Increased Visibility</h3>
//             </div>
//             <p className="text-gray-600">Reach more potential buyers with our optimized listing platform.</p>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-purple-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Performance Analytics</h3>
//             </div>
//             <p className="text-gray-600">Track views, inquiries, and other metrics to optimize your listings.</p>
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="mt-8 text-center text-gray-500 text-sm">
//           <p>Need help with your properties? Contact our support team for assistance.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgentProperties;

// c k pandey


import React, { useState, useEffect, useContext } from 'react';
import { getProperties } from '../../services/propertyService';
import { AuthContext } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';

const AgentProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('DESC');
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const params = {
          page,
          size,
          sortBy,
          sortDir,
          q: searchQuery || undefined,
        };
        const response = await getProperties(params);
        setProperties(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
        setError(null);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, size, sortBy, sortDir, searchQuery, user.id]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Handle pagination
  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset to first page on search
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Your Property Listings
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage and showcase all your properties in one place
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by title or address..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#16A085]"
          />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
              </div>
            </div>
          </div>
          {/* ... other stat cards remain unchanged */}
        </div>

        {/* Properties Grid */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">All Properties</h2>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]">
              Add New Property
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A085]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No properties found</h3>
              <p className="mt-1 text-gray-500 max-w-md mx-auto">
                You haven't added any properties yet. Get started by adding your first property listing.
              </p>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]">
                  Add Your First Property
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Property Image */}
                    <div className="h-48 bg-gray-200 relative">
                      {prop.images && prop.images.length > 0 ? (
                        <img
                          src={prop.images[0].url}
                          alt={prop.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <svg
                            className="h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            prop.rented ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {prop.rented ? 'Rented' : 'Available'}
                        </span>
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{prop.title}</h3>
                        <span className="text-lg font-bold text-[#16A085]">
                          {prop.offerPrice
                            ? formatCurrency(prop.offerPrice)
                            : prop.price
                            ? formatCurrency(prop.price)
                            : 'Price not set'}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{prop.description}</p>

                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
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

                        <button className="text-[#16A085] hover:text-[#138871] text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 0}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    page === 0
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[#16A085] text-white hover:bg-[#138871]'
                  }`}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page >= totalPages - 1}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    page >= totalPages - 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[#16A085] text-white hover:bg-[#138871]'
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Easy Management</h3>
            </div>
            <p className="text-gray-600">Update property details, photos, and pricing with just a few clicks.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Increased Visibility</h3>
            </div>
            <p className="text-gray-600">Reach more potential buyers with our optimized listing platform.</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Performance Analytics</h3>
            </div>
            <p className="text-gray-600">Track views, inquiries, and other metrics to optimize your listings.</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Need help with your properties? Contact our support team for assistance.</p>
        </div>
      </div>
    </div>
  );
};

export default AgentProperties;