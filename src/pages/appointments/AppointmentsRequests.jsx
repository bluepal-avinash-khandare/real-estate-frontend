// import React, { useState, useEffect, useContext } from 'react';
// import { getAppointmentsRequests, updateAppointmentStatus } from '../../services/appointmentService';
// import { AuthContext } from '../../contexts/AuthContext';
// import Table from '../../components/common/Table';
// import Filter from '../../components/common/Filter';
// import { useNavigate } from 'react-router-dom';

// const AppointmentsRequests = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [requests, setRequests] = useState([]);
//   const [filter, setFilter] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [actionLoading, setActionLoading] = useState(null);

//   useEffect(() => {
//     // Verify user is an agent and has a valid ID
//     if (!user || user.role !== 'AGENT') {
//       setError('Access denied. Only agents can view appointment requests.');
//       setLoading(false);
//       return;
//     }

//     // Check if user ID is valid
//     if (!user.id && !user.userId) {
//       setError('User ID is missing. Please log in again.');
//       setLoading(false);
//       return;
//     }

//     const fetchRequests = async () => {
//       setLoading(true);
//       try {
//         // Get user ID - try different possible properties
//         const userId = user.id || user.userId || user.sub || user._id;
        
//         if (!userId) {
//           console.error('User object missing ID:', user);
//           setError('User ID not found. Please log in again.');
//           setLoading(false);
//           return;
//         }
        
//         console.log('Fetching requests for agentId:', userId, 'with filter:', filter);
        
//         const response = await getAppointmentsRequests(userId, filter);
//         console.log('API response:', response);
        
//         // Handle different response structures
//         let appointments = [];
//         if (response.data) {
//           if (response.data.content) {
//             // If it's a paginated response
//             appointments = response.data.content;
//           } else if (Array.isArray(response.data)) {
//             // If it's a direct array
//             appointments = response.data;
//           }
//         }
        
//         console.log('Appointments extracted:', appointments);
//         setRequests(appointments);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching appointment requests:', err);
        
//         // Handle specific error messages
//         if (err.response?.status === 500) {
//           setError('Server error. Please try again later.');
//         } else if (err.response?.data?.message) {
//           setError(err.response.data.message);
//         } else {
//           setError('Failed to fetch appointment requests');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRequests();
//   }, [filter, user]);

//   const handleFilterChange = (e) => setFilter(e.target.value);

//   const handleStatusUpdate = async (appointmentId, newStatus) => {
//     setActionLoading(appointmentId);
//     try {
//       await updateAppointmentStatus(appointmentId, newStatus);
//       // Update the local state to reflect the change
//       setRequests(requests.map(req => 
//         req.id === appointmentId ? { ...req, status: newStatus } : req
//       ));
//     } catch (err) {
//       console.error(`Error updating status to ${newStatus}:`, err);
//       setError(`Failed to ${newStatus.toLowerCase()} appointment`);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleViewDetails = (appointmentId) => {
//     navigate(`/appointment-action/${appointmentId}`);
//   };

//   const headers = ['ID', 'Buyer', 'Property', 'Date & Time', 'Status', 'Actions'];

//   const rows = requests.map((req) => {
//     // Handle buyer details - try different possible properties
//     const buyerName = req.customerDetails?.name || 
//                      req.customerName || 
//                      req.customer?.name || 
//                      req.buyerDetails?.name || 
//                      req.buyerName || 
//                      req.buyer?.name || 
//                      'N/A';
    
//     // Handle property details - try different possible properties
//     const propertyTitle = req.propertyReference || 
//                          req.property?.title || 
//                          req.propertyName || 
//                          req.property?.name || 
//                          'N/A';
    
//     // Format date and time - handle different possible structures
//     let formattedDateTime = 'N/A';
//     if (req.preferredTimes && req.preferredTimes.length > 0) {
//       const dateTime = new Date(req.preferredTimes[0]);
//       formattedDateTime = `${dateTime.toLocaleDateString()} at ${dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
//     } else if (req.appointmentDate && req.appointmentTime) {
//       formattedDateTime = `${new Date(req.appointmentDate).toLocaleDateString()} at ${req.appointmentTime}`;
//     } else if (req.date && req.time) {
//       formattedDateTime = `${new Date(req.date).toLocaleDateString()} at ${req.time}`;
//     }
    
//     return {
//       id: req.id,
//       buyer: buyerName,
//       property: propertyTitle,
//       dateTime: formattedDateTime,
//       status: (
//         <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(req.status)}`}>
//           {req.status}
//         </span>
//       ),
//       actions: (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleViewDetails(req.id)}
//             className="text-blue-600 hover:text-blue-900 text-sm font-medium"
//           >
//             View Details
//           </button>
//           {req.status === 'PENDING' && (
//             <>
//               <button
//                 onClick={() => handleStatusUpdate(req.id, 'CONFIRMED')}
//                 disabled={actionLoading === req.id}
//                 className="text-green-600 hover:text-green-900 text-sm font-medium disabled:opacity-50"
//               >
//                 {actionLoading === req.id ? 'Processing...' : 'Confirm'}
//               </button>
//               <button
//                 onClick={() => handleStatusUpdate(req.id, 'CANCELLED')}
//                 disabled={actionLoading === req.id}
//                 className="text-red-600 hover:text-red-900 text-sm font-medium disabled:opacity-50"
//               >
//                 {actionLoading === req.id ? 'Processing...' : 'Cancel'}
//               </button>
//             </>
//           )}
//         </div>
//       )
//     };
//   });

//   const getStatusColor = (status) => {
//     switch(status?.toUpperCase()) {
//       case 'CONFIRMED': return 'bg-green-100 text-green-800';
//       case 'PENDING': return 'bg-yellow-100 text-yellow-800';
//       case 'CANCELLED': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
//             Appointment Requests
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Manage and track all your property viewing appointments in one place
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-blue-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Requests</p>
//                 <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-green-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Confirmed</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {requests.filter(req => req.status?.toUpperCase() === 'CONFIRMED').length}
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-yellow-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Pending</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {requests.filter(req => req.status?.toUpperCase() === 'PENDING').length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Debug Information */}
//         <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-blue-800">Debug Information</h3>
//               <div className="mt-2 text-sm text-blue-700">
//                 <p>Agent ID: {user?.id || user?.userId || 'Not found'}</p>
//                 <p>Number of appointments: {requests.length}</p>
//                 <p>If you see "No appointments found", check:</p>
//                 <ul className="list-disc pl-5 mt-1">
//                   <li>Are appointments being created with the correct agent ID?</li>
//                   <li>Is the agent ID in the user object correct?</li>
//                   <li>Is the backend returning appointments for this agent?</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">All Appointments</h2>
//                 <p className="text-gray-600 mt-1">View and manage your appointment requests</p>
//               </div>
//               <div className="mt-4 md:mt-0">
//                 <div className="relative rounded-md shadow-sm max-w-xs">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <Filter 
//                     value={filter}
//                     onChange={handleFilterChange} 
//                     placeholder="Search appointments..." 
//                     className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Table Container */}
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
//                     <button 
//                       onClick={() => window.location.reload()} 
//                       className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
//                     >
//                       Reload page
//                     </button>
//                     <button 
//                       onClick={() => {
//                         localStorage.clear();
//                         window.location.href = '/login';
//                       }}
//                       className="mt-2 ml-2 text-sm text-red-600 hover:text-red-800 underline"
//                     >
//                       Log in again
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : requests.length === 0 ? (
//               <div className="text-center py-16">
//                 <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 <h3 className="mt-4 text-lg font-medium text-gray-900">No appointments found</h3>
//                 <p className="mt-1 text-gray-500 max-w-md mx-auto">
//                   {filter ? 'No appointments match your search criteria.' : 'You don\'t have any appointment requests yet.'}
//                 </p>
//                 <div className="mt-6">
//                   <button
//                     onClick={() => setFilter('')}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]"
//                   >
//                     {filter ? 'Clear Search' : 'Refresh'}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-200">
//                 <Table headers={headers} rows={rows} />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="mt-8 text-center text-gray-500 text-sm">
//           <p>Need help? Contact our support team for assistance with your appointments.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentsRequests;



// import React, { useState, useEffect, useContext } from 'react';
// import { getAppointmentsRequests, updateAppointmentStatus } from '../../services/appointmentService';
// import { AuthContext } from '../../contexts/AuthContext';
// import Table from '../../components/common/Table';
// import Filter from '../../components/common/Filter';
// import { useNavigate } from 'react-router-dom';

// const AppointmentsRequests = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [requests, setRequests] = useState([]);
//   const [filter, setFilter] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [actionLoading, setActionLoading] = useState(null);

//   useEffect(() => {
//     // Verify user is an agent and has a valid ID
//     if (!user || user.role !== 'AGENT') {
//       setError('Access denied. Only agents can view appointment requests.');
//       setLoading(false);
//       return;
//     }

//     // Check if user ID is valid
//     if (!user.id && !user.userId) {
//       setError('User ID is missing. Please log in again.');
//       setLoading(false);
//       return;
//     }

//     const fetchRequests = async () => {
//       setLoading(true);
//       try {
//         // Get user ID - try different possible properties
//         const userId = user.id || user.userId || user.sub || user._id;
        
//         if (!userId) {
//           console.error('User object missing ID:', user);
//           setError('User ID not found. Please log in again.');
//           setLoading(false);
//           return;
//         }
        
//         console.log('Fetching requests for agentId:', userId, 'with filter:', filter);
        
//         const response = await getAppointmentsRequests(userId, filter);
//         console.log('API response:', response);
        
//         // Handle different response structures
//         let appointments = [];
//         if (response.data) {
//           if (response.data.content) {
//             // If it's a paginated response
//             appointments = response.data.content;
//           } else if (Array.isArray(response.data)) {
//             // If it's a direct array
//             appointments = response.data;
//           }
//         }
        
//         console.log('Appointments extracted:', appointments);
//         setRequests(appointments);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching appointment requests:', err);
        
//         // Handle specific error messages
//         if (err.response?.status === 500) {
//           setError('Server error. Please try again later.');
//         } else if (err.response?.data?.message) {
//           setError(err.response.data.message);
//         } else {
//           setError('Failed to fetch appointment requests');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRequests();
//   }, [filter, user]);

//   const handleFilterChange = (e) => setFilter(e.target.value);

//   const handleStatusUpdate = async (appointmentId, newStatus) => {
//     setActionLoading(appointmentId);
//     try {
//       await updateAppointmentStatus(appointmentId, newStatus);
//       // Update the local state to reflect the change
//       setRequests(requests.map(req => 
//         req.id === appointmentId ? { ...req, status: newStatus } : req
//       ));
//     } catch (err) {
//       console.error(`Error updating status to ${newStatus}:`, err);
//       setError(`Failed to ${newStatus.toLowerCase()} appointment`);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleViewDetails = (appointmentId) => {
//     navigate(`/appointment-action/${appointmentId}`);
//   };

//   const handleStartChat = (customerId) => {
//     navigate(`/start-chat?leadId=${customerId}`);
//   };

//   const headers = ['ID', 'Customer', 'Property', 'Date & Time', 'Status', 'Actions'];

//   const rows = requests.map((req) => {
//     // Log the appointment request to see its structure
//     console.log('Appointment request data:', req);
    
//     // Handle customer details - try different possible properties
//     const customerName = req.customer?.name || 
//                      req.customer?.fullName ||
//                      req.customerDetails?.name || 
//                      req.customerDetails?.fullName ||
//                      req.customerName || 
//                      req.buyer?.name || 
//                      req.buyer?.fullName ||
//                      req.buyerDetails?.name || 
//                      req.buyerDetails?.fullName ||
//                      req.buyerName || 
//                      req.user?.name ||
//                      req.user?.fullName ||
//                      req.bookedBy?.name ||
//                      req.bookedBy?.fullName ||
//                      'N/A';
    
//     // Get customer ID for chat functionality
//     const customerId = req.customer?.id || 
//                       req.customerDetails?.id || 
//                       req.customerId || 
//                       req.buyer?.id || 
//                       req.buyerDetails?.id || 
//                       req.bookedBy?.id;
    
//     // Handle property details - try different possible properties
//     const propertyTitle = req.property?.title || 
//                          req.property?.propertyName ||
//                          req.propertyReference || 
//                          req.propertyName || 
//                          'N/A';
    
//     // Format date and time - handle different possible structures
//     let formattedDateTime = 'N/A';
//     if (req.preferredTimes && req.preferredTimes.length > 0) {
//       const dateTime = new Date(req.preferredTimes[0]);
//       formattedDateTime = `${dateTime.toLocaleDateString()} at ${dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
//     } else if (req.appointmentDate && req.appointmentTime) {
//       formattedDateTime = `${new Date(req.appointmentDate).toLocaleDateString()} at ${req.appointmentTime}`;
//     } else if (req.date && req.time) {
//       formattedDateTime = `${new Date(req.date).toLocaleDateString()} at ${req.time}`;
//     }
    
//     return {
//       id: req.id,
//       customer: (
//         <div>
//           <div className="font-medium">{customerName}</div>
//           {req.customer?.email && (
//             <div className="text-sm text-gray-500">{req.customer.email}</div>
//           )}
//           {req.customer?.phone && (
//             <div className="text-sm text-gray-500">{req.customer.phone}</div>
//           )}
//         </div>
//       ),
//       property: propertyTitle,
//       dateTime: formattedDateTime,
//       status: (
//         <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(req.status)}`}>
//           {req.status}
//         </span>
//       ),
//       actions: (
//         <div className="flex flex-col space-y-2">
//           <button
//             onClick={() => handleViewDetails(req.id)}
//             className="text-blue-600 hover:text-blue-900 text-sm font-medium"
//           >
//             View Details
//           </button>
//           {req.status === 'PENDING' && (
//             <>
//               <button
//                 onClick={() => handleStatusUpdate(req.id, 'CONFIRMED')}
//                 disabled={actionLoading === req.id}
//                 className="text-green-600 hover:text-green-900 text-sm font-medium disabled:opacity-50"
//               >
//                 {actionLoading === req.id ? 'Processing...' : 'Confirm'}
//               </button>
//               <button
//                 onClick={() => handleStatusUpdate(req.id, 'CANCELLED')}
//                 disabled={actionLoading === req.id}
//                 className="text-red-600 hover:text-red-900 text-sm font-medium disabled:opacity-50"
//               >
//                 {actionLoading === req.id ? 'Processing...' : 'Cancel'}
//               </button>
//             </>
//           )}
//           {req.status === 'CONFIRMED' && customerId && (
//             <button
//               onClick={() => handleStartChat(customerId)}
//               className="text-purple-600 hover:text-purple-900 text-sm font-medium"
//             >
//               Start Chat
//             </button>
//           )}
//         </div>
//       )
//     };
//   });

//   const getStatusColor = (status) => {
//     switch(status?.toUpperCase()) {
//       case 'CONFIRMED': return 'bg-green-100 text-green-800';
//       case 'PENDING': return 'bg-yellow-100 text-yellow-800';
//       case 'CANCELLED': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
//             Appointment Requests
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Manage and track all your property viewing appointments in one place
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-blue-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Requests</p>
//                 <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-green-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Confirmed</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {requests.filter(req => req.status?.toUpperCase() === 'CONFIRMED').length}
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-yellow-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Pending</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {requests.filter(req => req.status?.toUpperCase() === 'PENDING').length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Debug Information */}
//         <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-blue-800">Debug Information</h3>
//               <div className="mt-2 text-sm text-blue-700">
//                 <p>Agent ID: {user?.id || user?.userId || 'Not found'}</p>
//                 <p>Number of appointments: {requests.length}</p>
//                 <p>If you see "No appointments found", check:</p>
//                 <ul className="list-disc pl-5 mt-1">
//                   <li>Are appointments being created with the correct agent ID?</li>
//                   <li>Is the agent ID in the user object correct?</li>
//                   <li>Is the backend returning appointments for this agent?</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">All Appointments</h2>
//                 <p className="text-gray-600 mt-1">View and manage your appointment requests</p>
//               </div>
//               <div className="mt-4 md:mt-0">
//                 <div className="relative rounded-md shadow-sm max-w-xs">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <Filter 
//                     value={filter}
//                     onChange={handleFilterChange} 
//                     placeholder="Search appointments..." 
//                     className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Table Container */}
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
//                     <button 
//                       onClick={() => window.location.reload()} 
//                       className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
//                     >
//                       Reload page
//                     </button>
//                     <button 
//                       onClick={() => {
//                         localStorage.clear();
//                         window.location.href = '/login';
//                       }}
//                       className="mt-2 ml-2 text-sm text-red-600 hover:text-red-800 underline"
//                     >
//                       Log in again
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : requests.length === 0 ? (
//               <div className="text-center py-16">
//                 <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 <h3 className="mt-4 text-lg font-medium text-gray-900">No appointments found</h3>
//                 <p className="mt-1 text-gray-500 max-w-md mx-auto">
//                   {filter ? 'No appointments match your search criteria.' : 'You don\'t have any appointment requests yet.'}
//                 </p>
//                 <div className="mt-6">
//                   <button
//                     onClick={() => setFilter('')}
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]"
//                   >
//                     {filter ? 'Clear Search' : 'Refresh'}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-200">
//                 <Table headers={headers} rows={rows} />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="mt-8 text-center text-gray-500 text-sm">
//           <p>Need help? Contact our support team for assistance with your appointments.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentsRequests;



import React, { useState, useEffect, useContext } from 'react';
import { getAppointmentsRequests, updateAppointmentStatus } from '../../services/appointmentService';
import { AuthContext } from '../../contexts/AuthContext';
import Table from '../../components/common/Table';
import Filter from '../../components/common/Filter';
import { useNavigate } from 'react-router-dom';

const AppointmentsRequests = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    // Verify user is an agent and has a valid ID
    if (!user || user.role !== 'AGENT') {
      setError('Access denied. Only agents can view appointment requests.');
      setLoading(false);
      return;
    }

    // Check if user ID is valid
    if (!user.id && !user.userId) {
      setError('User ID is missing. Please log in again.');
      setLoading(false);
      return;
    }

    const fetchRequests = async () => {
      setLoading(true);
      try {
        // Get user ID - try different possible properties
        const userId = user.id || user.userId || user.sub || user._id;
        
        if (!userId) {
          console.error('User object missing ID:', user);
          setError('User ID not found. Please log in again.');
          setLoading(false);
          return;
        }
        
        console.log('Fetching requests for agentId:', userId, 'with filter:', filter);
        
        const response = await getAppointmentsRequests(userId, filter);
        console.log('API response:', response);
        
        // Handle different response structures
        let appointments = [];
        if (response.data) {
          if (response.data.content) {
            // If it's a paginated response
            appointments = response.data.content;
          } else if (Array.isArray(response.data)) {
            // If it's a direct array
            appointments = response.data;
          }
        }
        
        console.log('Appointments extracted:', appointments);
        setRequests(appointments);
        setError(null);
      } catch (err) {
        console.error('Error fetching appointment requests:', err);
        
        // Handle specific error messages
        if (err.response?.status === 500) {
          setError('Server error. Please try again later.');
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Failed to fetch appointment requests');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [filter, user]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    setActionLoading(appointmentId);
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
      // Update the local state to reflect the change
      setRequests(requests.map(req => 
        req.id === appointmentId ? { ...req, status: newStatus } : req
      ));
    } catch (err) {
      console.error(`Error updating status to ${newStatus}:`, err);
      setError(`Failed to ${newStatus.toLowerCase()} appointment`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewDetails = (appointmentId) => {
    navigate(`/appointment-action/${appointmentId}`);
  };

  const handleStartChat = (customerId) => {
    navigate(`/start-chat?leadId=${customerId}`);
  };

  // Define getStatusColor before it's used
  const getStatusColor = (status) => {
    switch(status?.toUpperCase()) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const headers = ['ID', 'Customer', 'Property', 'Date & Time', 'Status', 'Actions'];

  const rows = requests.map((req) => {
    // Log the appointment request to see its structure
    console.log('Appointment request data:', req);
    
    // Handle customer details - try different possible properties
    const customerName = req.customer?.name || 
                     req.customer?.fullName ||
                     req.customerDetails?.name || 
                     req.customerDetails?.fullName ||
                     req.customerName || 
                     req.buyer?.name || 
                     req.buyer?.fullName ||
                     req.buyerDetails?.name || 
                     req.buyerDetails?.fullName ||
                     req.buyerName || 
                     req.user?.name ||
                     req.user?.fullName ||
                     req.bookedBy?.name ||
                     req.bookedBy?.fullName ||
                     'N/A';
    
    // Get customer ID for chat functionality
    const customerId = req.customer?.id || 
                      req.customerDetails?.id || 
                      req.customerId || 
                      req.buyer?.id || 
                      req.buyerDetails?.id || 
                      req.bookedBy?.id;
    
    // Handle property details - try different possible properties
    const propertyTitle = req.property?.title || 
                         req.property?.propertyName ||
                         req.propertyReference || 
                         req.propertyName || 
                         'N/A';
    
    // Format date and time - handle different possible structures
    let formattedDateTime = 'N/A';
    if (req.preferredTimes && req.preferredTimes.length > 0) {
      const dateTime = new Date(req.preferredTimes[0]);
      formattedDateTime = `${dateTime.toLocaleDateString()} at ${dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } else if (req.appointmentDate && req.appointmentTime) {
      formattedDateTime = `${new Date(req.appointmentDate).toLocaleDateString()} at ${req.appointmentTime}`;
    } else if (req.date && req.time) {
      formattedDateTime = `${new Date(req.date).toLocaleDateString()} at ${req.time}`;
    }
    
    return {
      id: req.id,
      customer: (
        <div>
          <div className="font-medium">{customerName}</div>
          {req.customer?.email && (
            <div className="text-sm text-gray-500">{req.customer.email}</div>
          )}
          {req.customer?.phone && (
            <div className="text-sm text-gray-500">{req.customer.phone}</div>
          )}
        </div>
      ),
      property: propertyTitle,
      dateTime: formattedDateTime,
      status: (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(req.status)}`}>
          {req.status}
        </span>
      ),
      actions: (
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => handleViewDetails(req.id)}
            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
          >
            View Details
          </button>
          {req.status === 'PENDING' && (
            <>
              <button
                onClick={() => handleStatusUpdate(req.id, 'CONFIRMED')}
                disabled={actionLoading === req.id}
                className="text-green-600 hover:text-green-900 text-sm font-medium disabled:opacity-50"
              >
                {actionLoading === req.id ? 'Processing...' : 'Confirm'}
              </button>
              <button
                onClick={() => handleStatusUpdate(req.id, 'CANCELLED')}
                disabled={actionLoading === req.id}
                className="text-red-600 hover:text-red-900 text-sm font-medium disabled:opacity-50"
              >
                {actionLoading === req.id ? 'Processing...' : 'Cancel'}
              </button>
            </>
          )}
          {req.status === 'CONFIRMED' && customerId && (
            <button
              onClick={() => handleStartChat(customerId)}
              className="text-purple-600 hover:text-purple-900 text-sm font-medium"
            >
              Start Chat
            </button>
          )}
        </div>
      )
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Appointment Requests
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage and track all your property viewing appointments in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {requests.filter(req => req.status?.toUpperCase() === 'CONFIRMED').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {requests.filter(req => req.status?.toUpperCase() === 'PENDING').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Debug Information */}
        <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Debug Information</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Agent ID: {user?.id || user?.userId || 'Not found'}</p>
                <p>Number of appointments: {requests.length}</p>
                <p>If you see "No appointments found", check:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>Are appointments being created with the correct agent ID?</li>
                  <li>Is the agent ID in the user object correct?</li>
                  <li>Is the backend returning appointments for this agent?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">All Appointments</h2>
                <p className="text-gray-600 mt-1">View and manage your appointment requests</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="relative rounded-md shadow-sm max-w-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <Filter 
                    value={filter}
                    onChange={handleFilterChange} 
                    placeholder="Search appointments..." 
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
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
                    <button 
                      onClick={() => window.location.reload()} 
                      className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                    >
                      Reload page
                    </button>
                    <button 
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = '/login';
                      }}
                      className="mt-2 ml-2 text-sm text-red-600 hover:text-red-800 underline"
                    >
                      Log in again
                    </button>
                  </div>
                </div>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-16">
                <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No appointments found</h3>
                <p className="mt-1 text-gray-500 max-w-md mx-auto">
                  {filter ? 'No appointments match your search criteria.' : 'You don\'t have any appointment requests yet.'}
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setFilter('')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]"
                  >
                    {filter ? 'Clear Search' : 'Refresh'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {/* Add this temporary debug section */}
                <div className="p-4 bg-yellow-50">
                  <p className="text-sm text-yellow-800">Debug: Found {requests.length} appointments. Displaying table below.</p>
                </div>
                <Table headers={headers} rows={rows} />
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Need help? Contact our support team for assistance with your appointments.</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsRequests;