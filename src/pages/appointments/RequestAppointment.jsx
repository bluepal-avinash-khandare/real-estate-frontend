// // import React from 'react';
// // import AppointmentRequestForm from '../../components/forms/AppointmentRequestForm';
// // import { requestAppointment } from '../../services/appointmentService';

// // const RequestAppointment = () => {
// //   const handleSubmit = async (values) => {
// //     try {
// //       await requestAppointment(values);
// //       alert('Appointment requested');
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <AppointmentRequestForm onSubmit={handleSubmit} />
// //     </div>
// //   );
// // };

// // export default RequestAppointment;

// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthContext';
// import AppointmentRequestForm from '../../components/forms/AppointmentRequestForm';
// import { requestAppointment } from '../../services/appointmentService';

// const RequestAppointment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useContext(AuthContext);
//   const [paymentVerified, setPaymentVerified] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [propertyId, setPropertyId] = useState(null);

//   useEffect(() => {
//     // Check if user is authenticated
//     if (!isAuthenticated || !user) {
//       navigate('/login');
//       return;
//     }

//     // Get property ID from location state or localStorage
//     const propId = location.state?.propertyId || localStorage.getItem('currentPropertyId');
//     if (!propId) {
//       setError('Property ID not found. Please try again.');
//       setLoading(false);
//       return;
//     }
    
//     setPropertyId(propId);

//     // Check payment status
//     const userId = user.userId || user.id;
//     const paymentKey = `payment_${propId}_user_${userId}`;
//     const paymentDataString = localStorage.getItem(paymentKey);

//     if (paymentDataString) {
//       const paymentData = JSON.parse(paymentDataString);
//       if (paymentData.paid && paymentData.status === 'PAID') {
//         setPaymentVerified(true);
//       } else {
//         setError('Payment not completed. Please complete your payment first.');
//       }
//     } else {
//       setError('Payment information not found. Please make a payment first.');
//     }

//     setLoading(false);
//   }, [isAuthenticated, user, location.state, navigate]);

//   const handleSubmit = async (values) => {
//     if (!paymentVerified) {
//       setError('Please complete your payment before booking an appointment.');
//       return;
//     }

//     try {
//       // Include property ID in the appointment request
//       const appointmentData = {
//         ...values,
//         propertyId: propertyId
//       };
      
//       await requestAppointment(appointmentData);
//       alert('Appointment requested successfully!');
      
//       // Clear payment data after successful appointment booking
//       if (propertyId && user) {
//         const userId = user.userId || user.id;
//         const paymentKey = `payment_${propertyId}_user_${userId}`;
//         localStorage.removeItem(paymentKey);
//         localStorage.removeItem('currentPropertyId');
//       }
      
//       // Navigate to a confirmation page or dashboard
//       navigate('/dashboard');
//     } catch (error) {
//       console.error(error);
//       alert('Failed to request appointment. Please try again.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16A085] mx-auto"></div>
//           <p className="mt-4 text-gray-600">Verifying payment status...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 text-center">
//           <div className="text-red-500 mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Required</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={() => navigate('/initiate-payment', { state: { propertyId } })}
//             className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#16A085] hover:bg-[#138871] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]"
//           >
//             Go to Payment
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
//             Request an Appointment
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Schedule a property viewing at your convenience. Fill out the form below to request an appointment.
//           </p>
//           {paymentVerified && (
//             <div className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               Payment Verified
//             </div>
//           )}
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="md:flex">
//             {/* Left Side - Image */}
//             <div className="md:w-2/5 bg-gradient-to-br from-[#16A085] to-[#2C3E50] p-8 flex items-center justify-center">
//               <div className="text-center text-white">
//                 <div className="mb-6">
//                   <img 
//                     src="https://img.icons8.com/fluency/96/calendar-30.png" 
//                     alt="Calendar" 
//                     className="h-24 w-24 mx-auto"
//                   />
//                 </div>
//                 <h2 className="text-2xl font-bold mb-4">Simple & Fast</h2>
//                 <p className="text-teal-100 mb-6">
//                   Our appointment scheduling process is designed to be quick and hassle-free.
//                 </p>
//                 <div className="flex justify-center space-x-4">
//                   <div className="bg-teal-700 bg-opacity-50 rounded-full p-3">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <div className="bg-teal-700 bg-opacity-50 rounded-full p-3">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div className="bg-teal-700 bg-opacity-50 rounded-full p-3">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Form */}
//             <div className="md:w-3/5 p-8">
//               <div className="mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Details</h2>
//                 <p className="text-gray-600">Please provide the required information to schedule your appointment.</p>
//               </div>
              
//               <AppointmentRequestForm onSubmit={handleSubmit} />
              
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm text-gray-600">
//                       Need assistance? Contact our support team at <a href="mailto:support@example.com" className="font-medium text-[#16A085] hover:text-[#138871]">support@example.com</a> or call <span className="font-medium text-[#16A085]">+1 (555) 123-4567</span>.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Information */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-blue-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Flexible Scheduling</h3>
//             </div>
//             <p className="text-gray-600">Choose from multiple available time slots that fit your schedule.</p>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-green-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Secure Process</h3>
//             </div>
//             <p className="text-gray-600">Your information is protected with industry-standard security measures.</p>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-purple-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Instant Confirmation</h3>
//             </div>
//             <p className="text-gray-600">Receive immediate confirmation of your appointment request.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestAppointment;


// ck pandey

import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AppointmentRequestForm from '../../components/forms/AppointmentRequestForm';
import { requestAppointment, getCustomerAppointments } from '../../services/appointmentService';

const RequestAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [propertyId, setPropertyId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 10, totalPages: 1 });
  const [viewMode, setViewMode] = useState('table');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    // Get property ID from location state or localStorage
    const propId = location.state?.propertyId || localStorage.getItem('currentPropertyId');
    setPropertyId(propId);

    // Fetch customer appointments
    const fetchAppointments = async () => {
      try {
        const userId = user.userId || user.id;
        console.log('🔄 Fetching appointments for user:', userId);
        
        const data = await getCustomerAppointments(userId, pageInfo.page, pageInfo.size, token);
        console.log('📦 Appointments data received:', data);
        
        // Handle different possible response structures
        let appointmentsData = [];
        let paginationInfo = { page: 0, size: 10, totalPages: 1 };
        
        if (data && data.content) {
          // Spring Page structure
          appointmentsData = data.content;
          paginationInfo = {
            page: data.number || 0,
            size: data.size || 10,
            totalPages: data.totalPages || 1
          };
        } else if (Array.isArray(data)) {
          // Direct array
          appointmentsData = data;
        } else if (data && data.data && Array.isArray(data.data)) {
          // Wrapped array response
          appointmentsData = data.data;
        }
        
        console.log('✅ Setting appointments:', appointmentsData);
        setAppointments(appointmentsData);
        setPageInfo(paginationInfo);
        setError(null);
        
      } catch (err) {
        console.error('❌ Error fetching appointments:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load appointments. Please try again.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [isAuthenticated, user, location.state, navigate, token, pageInfo.page, pageInfo.size]);

  const handleSubmit = async (values) => {
    try {
      if (!propertyId) {
        alert('Please select a property first.');
        return;
      }

      const appointmentData = {
        ...values,
        propertyId: propertyId,
        customerId: user.userId || user.id,
      };
      
      console.log('📝 Submitting appointment:', appointmentData);
      
      await requestAppointment(appointmentData, token);
      alert('Appointment requested successfully!');
      
      // Clear stored property ID after successful appointment booking
      if (propertyId) {
        localStorage.removeItem('currentPropertyId');
        setPropertyId(null);
      }
      
      // Refresh appointments after booking
      const userId = user.userId || user.id;
      const data = await getCustomerAppointments(userId, 0, pageInfo.size, token);
      
      let appointmentsData = [];
      if (data && data.content) {
        appointmentsData = data.content;
        setPageInfo({
          page: data.number || 0,
          size: data.size || 10,
          totalPages: data.totalPages || 1,
        });
      } else if (Array.isArray(data)) {
        appointmentsData = data;
      }
      
      setAppointments(appointmentsData);

    } catch (error) {
      console.error('❌ Appointment submission error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to request appointment. Please try again.';
      alert(errorMessage);
    }
  };

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setPageInfo((prev) => ({ ...prev, page: pageNumber }));
  };

  // Format date for display - using createdAt since appointmentDate is not available
  const formatDate = (appointment) => {
    const dateString = appointment.createdAt;
    
    if (!dateString) return 'Date not available';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      };
      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  // Format time for display - using createdAt since appointmentDate is not available
  const formatTime = (appointment) => {
    const dateString = appointment.createdAt;
    
    if (!dateString) return 'Time not available';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid time';
      
      const options = { 
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      return date.toLocaleTimeString(undefined, options);
    } catch (error) {
      console.error('Time formatting error:', error);
      return 'Invalid time';
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'approved':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'accepted':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'cancelled':
      case 'rejected':
      case 'declined':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Get property name
  const getPropertyName = (appointment) => {
    return appointment.propertyReference || `Property ${appointment.propertyId}`;
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const totalPages = pageInfo.totalPages;
    const currentPage = pageInfo.page;
    
    if (totalPages <= 7) {
      // Show all pages if total pages is 7 or less
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(0);
      
      // Show pages around current page
      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages - 2, currentPage + 1);
      
      // Add ellipsis if needed after first page
      if (startPage > 1) {
        pages.push('ellipsis-start');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        if (i > 0 && i < totalPages - 1) {
          pages.push(i);
        }
      }
      
      // Add ellipsis if needed before last page
      if (endPage < totalPages - 2) {
        pages.push('ellipsis-end');
      }
      
      // Always show last page
      pages.push(totalPages - 1);
    }
    
    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16A085] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Appointment Management
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Schedule new appointments and manage your existing ones.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Appointment Request Form */}
        {propertyId && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Request New Appointment</h2>
                <p className="text-gray-600">
                  Fill out the form below to schedule a new appointment for Property #{propertyId}.
                </p>
              </div>
              
              <AppointmentRequestForm onSubmit={handleSubmit} />
            </div>
          </div>
        )}

        {/* No Property Selected Message */}
        {!propertyId && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-12">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">No Property Selected</h3>
                <p className="text-yellow-700">
                  To schedule a new appointment, please select a property first from the properties page.
                </p>
                <button
                  onClick={() => navigate('/properties')}
                  className="mt-3 inline-flex items-center px-4 py-2 bg-[#16A085] text-white rounded-lg hover:bg-[#138871] transition-colors"
                >
                  Browse Properties
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Appointments List Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Appointments</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-[#16A085] text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'card' 
                    ? 'bg-[#16A085] text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Card View
              </button>
            </div>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
              <p className="text-gray-600">
                {propertyId 
                  ? "You haven't booked any appointments yet. Schedule your first appointment using the form above."
                  : "You haven't booked any appointments yet. Browse properties to schedule an appointment."
                }
              </p>
            </div>
          ) : viewMode === 'table' ? (
            <>
              {/* Clean Table View - SL, Property Name, Date, Time, Status */}
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SL No.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appointment, index) => (
                      <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1 + (pageInfo.page * pageInfo.size)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getPropertyName(appointment)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(appointment)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatTime(appointment)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            /* Card View - Removed # and showing separate Date & Time */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getPropertyName(appointment)}
                        </h3>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status || 'Pending'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium mr-1">Date:</span>
                        {formatDate(appointment)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium mr-1">Time:</span>
                        {formatTime(appointment)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced Pagination Controls */}
          {appointments.length > 0 && pageInfo.totalPages > 1 && (
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => handlePageChange(pageInfo.page - 1)}
                disabled={pageInfo.page === 0}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors ${
                  pageInfo.page === 0 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-[#16A085] hover:bg-[#138871] text-white'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]`}
              >
                &lt; Previous
              </button>
              
              <div className="flex space-x-1">
                {getPageNumbers().map((page, index) => {
                  if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                    return (
                      <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        pageInfo.page === page
                          ? 'bg-[#16A085] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {page + 1}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(pageInfo.page + 1)}
                disabled={pageInfo.page >= pageInfo.totalPages - 1}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors ${
                  pageInfo.page >= pageInfo.totalPages - 1 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-[#16A085] hover:bg-[#138871] text-white'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]`}
              >
                Next &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestAppointment;