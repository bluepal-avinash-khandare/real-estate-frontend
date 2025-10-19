// import React from 'react';
// import AppointmentRequestForm from '../../components/forms/AppointmentRequestForm';
// import { requestAppointment } from '../../services/appointmentService';

// const RequestAppointment = () => {
//   const handleSubmit = async (values) => {
//     try {
//       await requestAppointment(values);
//       alert('Appointment requested');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <AppointmentRequestForm onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default RequestAppointment;

import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AppointmentRequestForm from '../../components/forms/AppointmentRequestForm';
import { requestAppointment } from '../../services/appointmentService';

const RequestAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertyId, setPropertyId] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    // Get property ID from location state or localStorage
    const propId = location.state?.propertyId || localStorage.getItem('currentPropertyId');
    if (!propId) {
      setError('Property ID not found. Please try again.');
      setLoading(false);
      return;
    }
    
    setPropertyId(propId);

    // Check payment status
    const userId = user.userId || user.id;
    const paymentKey = `payment_${propId}_user_${userId}`;
    const paymentDataString = localStorage.getItem(paymentKey);

    if (paymentDataString) {
      const paymentData = JSON.parse(paymentDataString);
      if (paymentData.paid && paymentData.status === 'PAID') {
        setPaymentVerified(true);
      } else {
        setError('Payment not completed. Please complete your payment first.');
      }
    } else {
      setError('Payment information not found. Please make a payment first.');
    }

    setLoading(false);
  }, [isAuthenticated, user, location.state, navigate]);

  const handleSubmit = async (values) => {
    if (!paymentVerified) {
      setError('Please complete your payment before booking an appointment.');
      return;
    }

    try {
      // Include property ID in the appointment request
      const appointmentData = {
        ...values,
        propertyId: propertyId
      };
      
      await requestAppointment(appointmentData);
      alert('Appointment requested successfully!');
      
      // Clear payment data after successful appointment booking
      if (propertyId && user) {
        const userId = user.userId || user.id;
        const paymentKey = `payment_${propertyId}_user_${userId}`;
        localStorage.removeItem(paymentKey);
        localStorage.removeItem('currentPropertyId');
      }
      
      // Navigate to a confirmation page or dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Failed to request appointment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16A085] mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying payment status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Required</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/initiate-payment', { state: { propertyId } })}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#16A085] hover:bg-[#138871] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085]"
          >
            Go to Payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Request an Appointment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Schedule a property viewing at your convenience. Fill out the form below to request an appointment.
          </p>
          {paymentVerified && (
            <div className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Payment Verified
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Image */}
            <div className="md:w-2/5 bg-gradient-to-br from-[#16A085] to-[#2C3E50] p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-6">
                  <img 
                    src="https://img.icons8.com/fluency/96/calendar-30.png" 
                    alt="Calendar" 
                    className="h-24 w-24 mx-auto"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-4">Simple & Fast</h2>
                <p className="text-teal-100 mb-6">
                  Our appointment scheduling process is designed to be quick and hassle-free.
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="bg-teal-700 bg-opacity-50 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="bg-teal-700 bg-opacity-50 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="bg-teal-700 bg-opacity-50 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="md:w-3/5 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Details</h2>
                <p className="text-gray-600">Please provide the required information to schedule your appointment.</p>
              </div>
              
              <AppointmentRequestForm onSubmit={handleSubmit} />
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">
                      Need assistance? Contact our support team at <a href="mailto:support@example.com" className="font-medium text-[#16A085] hover:text-[#138871]">support@example.com</a> or call <span className="font-medium text-[#16A085]">+1 (555) 123-4567</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Flexible Scheduling</h3>
            </div>
            <p className="text-gray-600">Choose from multiple available time slots that fit your schedule.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Secure Process</h3>
            </div>
            <p className="text-gray-600">Your information is protected with industry-standard security measures.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Instant Confirmation</h3>
            </div>
            <p className="text-gray-600">Receive immediate confirmation of your appointment request.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestAppointment;