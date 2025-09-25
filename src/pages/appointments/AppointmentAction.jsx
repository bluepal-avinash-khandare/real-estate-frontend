// import React from 'react';
// import { useParams } from 'react-router-dom';
// import AppointmentActionForm from '../../components/forms/AppointmentActionForm';
// import { handleAppointmentAction } from '../../services/appointmentService';

// const AppointmentAction = () => {
//   const { id } = useParams();

//   const handleSubmit = async (values) => {
//     try {
//       await handleAppointmentAction(id, 'ACCEPT', values); // Example action, adjust as needed
//       alert('Action handled');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <AppointmentActionForm onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default AppointmentAction;

import React from 'react';
import { useParams } from 'react-router-dom';
import AppointmentActionForm from '../../components/forms/AppointmentActionForm';
import { handleAppointmentAction } from '../../services/appointmentService';

const AppointmentAction = () => {
  const { id } = useParams();

  const handleSubmit = async (values) => {
    try {
      await handleAppointmentAction(id, 'ACCEPT', values); // Example action, adjust as needed
      alert('Appointment action submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to submit action. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Appointment Action
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Respond to the appointment request by providing your action and alternative time slots if needed.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Information */}
            <div className="md:w-2/5 bg-gradient-to-br from-[#16A085] to-[#2C3E50] p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-6">
                  <img 
                    src="https://img.icons8.com/fluency/96/task-done.png" 
                    alt="Task Done" 
                    className="h-24 w-24 mx-auto"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-4">Quick Response</h2>
                <p className="text-teal-100 mb-6">
                  Your prompt response helps maintain a smooth scheduling process for all parties involved.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Provide clear reason</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Suggest alternatives if needed</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Submit your response promptly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="md:w-3/5 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Response</h2>
                <p className="text-gray-600">
                  Please provide your response to the appointment request. You can accept, decline, or propose alternative time slots.
                </p>
              </div>
              
              <AppointmentActionForm onSubmit={handleSubmit} />
              
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

        {/* Action Options */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Accept</h3>
            </div>
            <p className="text-gray-600">Confirm the appointment as requested. No further action needed from the buyer.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-yellow-500">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Reschedule</h3>
            </div>
            <p className="text-gray-600">Propose alternative time slots that work better for your schedule.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-red-500">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-red-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Decline</h3>
            </div>
            <p className="text-gray-600">Cancel the appointment with a clear reason for the buyer.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentAction;