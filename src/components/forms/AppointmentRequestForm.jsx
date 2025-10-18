// // // import React from 'react';
// // // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // // import { appointmentRequestSchema } from '../../utils/validationSchemas';
// // // import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
// // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // import CustomButton from '../common/CustomButton';
// // // import { getToday } from '../../utils/helpers';

// // // const AppointmentRequestForm = ({ onSubmit }) => (
// // //   <LocalizationProvider dateAdapter={AdapterDateFns}>
// // //     <Formik initialValues={{ buyerId: '', propertyId: '', preferredTimes: [], paymentToken: '' }} validationSchema={appointmentRequestSchema} onSubmit={onSubmit}>
// // //       {({ values, setFieldValue }) => (
// // //         <Form>
// // //           <Field name="buyerId" type="number" placeholder="Buyer ID" className="border p-2 mb-2 w-full" />
// // //           <ErrorMessage name="buyerId" component="div" className="text-red-500" />
// // //           <Field name="propertyId" type="number" placeholder="Property ID" className="border p-2 mb-2 w-full" />
// // //           <ErrorMessage name="propertyId" component="div" className="text-red-500" />
// // //           <div>
// // //             <DateTimePicker
// // //               label="Preferred Time"
// // //               minDate={getToday()}
// // //               onChange={(date) => setFieldValue('preferredTimes', [...values.preferredTimes, date])}
// // //             />
// // //           </div>
// // //           <ErrorMessage name="preferredTimes" component="div" className="text-red-500" />
// // //           <Field name="paymentToken" placeholder="Payment Token" className="border p-2 mb-2 w-full" />
// // //           <ErrorMessage name="paymentToken" component="div" className="text-red-500" />
// // //           <CustomButton type="submit">Request</CustomButton>
// // //         </Form>
// // //       )}
// // //     </Formik>
// // //   </LocalizationProvider>
// // // );

// // // export default AppointmentRequestForm;


// // import React from 'react';
// // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // import { appointmentRequestSchema } from '../../utils/validationSchemas';
// // import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
// // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // import CustomButton from '../common/CustomButton';
// // import { getToday } from '../../utils/helpers';

// // const AppointmentRequestForm = ({ onSubmit }) => (
// //   <div className="py-8">
// //     <div className="text-center mb-8">
// //       <h1 className="text-2xl font-bold text-gray-900">Schedule Appointment</h1>
// //       <p className="mt-1 text-gray-600">Fill in the details to request a property viewing</p>
// //     </div>

// //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// //       <Formik 
// //         initialValues={{ 
// //           buyerId: '', 
// //           propertyId: '', 
// //           preferredTimes: [], 
// //           paymentToken: '' 
// //         }} 
// //         validationSchema={appointmentRequestSchema} 
// //         onSubmit={onSubmit}
// //       >
// //         {({ values, setFieldValue }) => (
// //           <Form className="space-y-6">
// //             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
// //               {/* Buyer ID Field */}
// //               <div>
// //                 <label htmlFor="buyerId" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Buyer ID
// //                 </label>
// //                 <Field 
// //                   id="buyerId"
// //                   name="buyerId" 
// //                   type="number" 
// //                   placeholder="Enter buyer ID" 
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
// //                 />
// //                 <ErrorMessage name="buyerId" component="div" className="mt-1 text-sm text-red-600" />
// //               </div>

// //               {/* Property ID Field */}
// //               <div>
// //                 <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-1">
// //                   Property ID
// //                 </label>
// //                 <Field 
// //                   id="propertyId"
// //                   name="propertyId" 
// //                   type="number" 
// //                   placeholder="Enter property ID" 
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
// //                 />
// //                 <ErrorMessage name="propertyId" component="div" className="mt-1 text-sm text-red-600" />
// //               </div>
// //             </div>

// //             {/* Preferred Time Picker */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Preferred Time
// //               </label>
// //               <div className="relative">
// //                 <DateTimePicker
// //                   label="Select date and time"
// //                   minDate={getToday()}
// //                   onChange={(date) => setFieldValue('preferredTimes', [...values.preferredTimes, date])}
// //                   className="w-full"
// //                   slotProps={{
// //                     textField: {
// //                       fullWidth: true,
// //                       variant: 'outlined',
// //                       className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors'
// //                     }
// //                   }}
// //                 />
// //               </div>
// //               <ErrorMessage name="preferredTimes" component="div" className="mt-1 text-sm text-red-600" />
// //             </div>

// //             {/* Payment Token Field */}
// //             <div>
// //               <label htmlFor="paymentToken" className="block text-sm font-medium text-gray-700 mb-1">
// //                 Payment Token
// //               </label>
// //               <Field 
// //                 id="paymentToken"
// //                 name="paymentToken" 
// //                 type="text" 
// //                 placeholder="Enter payment token" 
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
// //               />
// //               <ErrorMessage name="paymentToken" component="div" className="mt-1 text-sm text-red-600" />
// //             </div>

// //             {/* Submit Button */}
// //             <div className="pt-4">
// //               <CustomButton
// //                 type="submit"
// //                 className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all"
// //               >
// //                 Request Appointment
// //               </CustomButton>
// //             </div>
// //           </Form>
// //         )}
// //       </Formik>
// //     </LocalizationProvider>
// //   </div>
// // );

// // export default AppointmentRequestForm;

// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useParams, useNavigate } from 'react-router-dom';
// import { appointmentRequestSchema } from '../../utils/validationSchemas';
// import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import CustomButton from '../common/CustomButton';
// import { getToday } from '../../utils/helpers';
// import { AuthContext } from '../../contexts/AuthContext';

// const AppointmentRequestForm = () => {
//   const { id } = useParams(); // Get property ID from URL
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useContext(AuthContext);
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [paymentData, setPaymentData] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef(null);

//   // Fetch property details and payment data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch property details
//         // const propertyResponse = await getProperty(id);
//         // setProperty(propertyResponse.data);
        
//         // For demo purposes, using mock data
//         setProperty({
//           id: id,
//           title: 'Sample Property',
//           agentId: 1,
//           agentName: 'John Doe',
//           agentEmail: 'john@example.com'
//         });
        
//         // Get payment data from localStorage using property ID
//         const storedPayment = localStorage.getItem(`payment_${id}`);
//         if (storedPayment) {
//           const payment = JSON.parse(storedPayment);
//           setPaymentData(payment);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   // Initialize chat with welcome message
//   useEffect(() => {
//     if (property) {
//       setMessages([
//         {
//           id: 1,
//           sender: property.agentName,
//           text: `Hello! I'm ${property.agentName}, the agent for this property. How can I help you today?`,
//           timestamp: new Date(),
//           isAgent: true
//         }
//       ]);
//     }
//   }, [property]);

//   // Scroll to bottom of chat
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Check if user has paid
//   useEffect(() => {
//     if (!loading && !paymentData) {
//       // Redirect to property details if payment not completed
//       navigate(`/property/${id}`);
//     }
//   }, [loading, paymentData, navigate, id]);

//   // Handle form submission
//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       // Prepare the appointment request with automatic values
//       const appointmentData = {
//         ...values,
//         buyerId: user.userId || user.id, // Get from authenticated user
//         propertyId: id, // Get from URL
//         paymentToken: paymentData.paymentId // Use paymentId as token from stored payment data
//       };

//       // Replace with your actual appointment service call
//       // await requestAppointment(appointmentData);
      
//       // For demo purposes, just log and show success
//       console.log('Appointment requested:', appointmentData);
      
//       // Show success message and navigate
//       alert('Appointment requested successfully!');
//       navigate('/properties');
//     } catch (error) {
//       console.error('Error requesting appointment:', error);
//       alert('Failed to request appointment. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Handle sending chat messages
//   const handleSendMessage = (e) => {
//     e.preventDefault();
    
//     if (!newMessage.trim()) return;
    
//     // Add user message
//     const userMessage = {
//       id: messages.length + 1,
//       sender: user?.name || 'Customer',
//       text: newMessage,
//       timestamp: new Date(),
//       isAgent: false
//     };
    
//     setMessages(prev => [...prev, userMessage]);
//     setNewMessage('');
    
//     // Simulate agent response (in a real app, this would be a backend call)
//     setTimeout(() => {
//       const agentResponse = {
//         id: messages.length + 2,
//         sender: property.agentName,
//         text: 'Thank you for your message. I will get back to you soon with more information about this property.',
//         timestamp: new Date(),
//         isAgent: true
//       };
      
//       setMessages(prev => [...prev, agentResponse]);
//     }, 1000);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A085]"></div>
//       </div>
//     );
//   }

//   if (!paymentData) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//           <h2 className="text-xl font-bold text-red-600">Payment Required</h2>
//           <p className="mt-2">You need to complete the payment before scheduling an appointment.</p>
//           <button 
//             onClick={() => navigate(`/property/${id}`)}
//             className="mt-4 px-4 py-2 bg-[#16A085] text-white rounded-lg hover:bg-[#138871]"
//           >
//             Back to Property
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Schedule Appointment</h1>
//           <p className="mt-2 text-gray-600">Fill in the details to request a property viewing</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Property Info */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//               <div className="bg-gradient-to-br from-[#16A085] to-[#2C3E50] p-6 text-white">
//                 <h2 className="text-xl font-bold mb-4">Property Information</h2>
//                 {property && (
//                   <div className="space-y-4">
//                     <div>
//                       <h3 className="font-semibold">{property.title}</h3>
//                       <p className="text-sm text-teal-100">Property ID: {property.id}</p>
//                     </div>
                    
//                     <div className="pt-4 border-t border-teal-700">
//                       <h3 className="font-semibold mb-2">Agent Information</h3>
//                       <p className="text-sm">{property.agentName}</p>
//                       <p className="text-sm">{property.agentEmail}</p>
//                     </div>
                    
//                     <div className="pt-4 border-t border-teal-700">
//                       <h3 className="font-semibold mb-2">Payment Details</h3>
//                       <p className="text-sm">Payment ID: {paymentData.paymentId}</p>
//                       <p className="text-sm">Date: {new Date(paymentData.date).toLocaleDateString()}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               <div className="p-6">
//                 <div className="bg-green-50 rounded-lg p-4 mb-4">
//                   <div className="flex items-center">
//                     <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-green-700 font-medium">Payment Completed</span>
//                   </div>
//                   <p className="text-sm text-green-600 mt-1">You have successfully paid for this property viewing.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Middle Column - Appointment Form */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">Appointment Details</h2>
              
//               <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <Formik 
//                   initialValues={{ 
//                     preferredTimes: [] 
//                   }} 
//                   validationSchema={appointmentRequestSchema} 
//                   onSubmit={handleSubmit}
//                 >
//                   {({ values, setFieldValue }) => (
//                     <Form className="space-y-6">
//                       {/* Preferred Time Picker */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Preferred Date and Time
//                         </label>
//                         <div className="relative">
//                           <DateTimePicker
//                             label="Select date and time"
//                             minDate={getToday()}
//                             onChange={(date) => {
//                               if (date) {
//                                 setFieldValue('preferredTimes', [...values.preferredTimes, date]);
//                               }
//                             }}
//                             className="w-full"
//                             slotProps={{
//                               textField: {
//                                 fullWidth: true,
//                                 variant: 'outlined',
//                                 className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors'
//                               }
//                             }}
//                           />
//                         </div>
//                         <ErrorMessage name="preferredTimes" component="div" className="mt-1 text-sm text-red-600" />
                        
//                         {/* Display selected times */}
//                         {values.preferredTimes.length > 0 && (
//                           <div className="mt-2">
//                             <p className="text-sm font-medium text-gray-700">Selected times:</p>
//                             <ul className="mt-1 space-y-1">
//                               {values.preferredTimes.map((time, index) => (
//                                 <li key={index} className="text-sm text-gray-600">
//                                   {time.toLocaleString()}
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                       </div>

//                       {/* Submit Button */}
//                       <div className="pt-4">
//                         <CustomButton
//                           type="submit"
//                           className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all"
//                         >
//                           Request Appointment
//                         </CustomButton>
//                       </div>
//                     </Form>
//                   )}
//                 </Formik>
//               </LocalizationProvider>
//             </div>
//           </div>

//           {/* Right Column - Chat Box */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full">
//               {/* Chat Header */}
//               <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white p-4">
//                 <h3 className="font-bold">Chat with Agent</h3>
//                 <p className="text-sm text-teal-100">{property?.agentName}</p>
//               </div>
              
//               {/* Chat Messages */}
//               <div className="flex-1 p-4 overflow-y-auto max-h-[60vh]">
//                 {messages.map((message) => (
//                   <div 
//                     key={message.id} 
//                     className={`mb-4 ${message.isAgent ? 'text-left' : 'text-right'}`}
//                   >
//                     <div 
//                       className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
//                         message.isAgent 
//                           ? 'bg-gray-100 text-gray-800' 
//                           : 'bg-[#16A085] text-white'
//                       }`}
//                     >
//                       <p>{message.text}</p>
//                       <p className={`text-xs mt-1 ${
//                         message.isAgent ? 'text-gray-500' : 'text-teal-100'
//                       }`}>
//                         {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>
              
//               {/* Chat Input */}
//               <div className="border-t border-gray-200 p-4">
//                 <form onSubmit={handleSendMessage} className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Type your message..."
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
//                   />
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-[#16A085] text-white rounded-lg hover:bg-[#138871] transition-colors"
//                   >
//                     Send
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentRequestForm;


import React, { useState, useEffect, useContext, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { appointmentRequestSchema } from '../../utils/validationSchemas';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomButton from '../common/CustomButton';
import { getToday } from '../../utils/helpers';
import { AuthContext } from '../../contexts/AuthContext';

const AppointmentRequestForm = () => {
  const { id } = useParams(); // Get property ID from URL
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch property details and payment data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch property details
        // const propertyResponse = await getProperty(id);
        // setProperty(propertyResponse.data);
        
        // For demo purposes, using mock data
        setProperty({
          id: id,
          title: 'Sample Property',
          agentId: 1,
          agentName: 'John Doe',
          agentEmail: 'john@example.com',
          agentPhone: '+91 9876543210'
        });
        
        // Get payment data from localStorage using user-specific key
        if (user && user.userId) {
          const paymentKey = `payment_${id}_user_${user.userId}`;
          const storedPayment = localStorage.getItem(paymentKey);
          if (storedPayment) {
            const payment = JSON.parse(storedPayment);
            setPaymentData(payment);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (property) {
      setMessages([
        {
          id: 1,
          sender: property.agentName,
          text: `Hello! I'm ${property.agentName}, the agent for this property. How can I help you today?`,
          timestamp: new Date(),
          isAgent: true
        }
      ]);
    }
  }, [property]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check if user has paid
  useEffect(() => {
    if (!loading && !paymentData) {
      // Redirect to property details if payment not completed
      navigate(`/property/${id}`);
    }
  }, [loading, paymentData, navigate, id]);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      // Prepare the appointment request with automatic values
      const appointmentData = {
        ...values,
        buyerId: user.userId || user.id, // Get from authenticated user
        propertyId: id, // Get from URL
        paymentToken: paymentData.paymentId, // Use paymentId as token from stored payment data
        agentId: property.agentId,
        preferredTimes: values.preferredTimes.map(time => time.toISOString())
      };

      console.log('Appointment requested:', appointmentData);
      
      // Here you would make your API call to create the appointment
      // const response = await createAppointment(appointmentData);
      
      // For demo purposes, we'll simulate a successful response
      setTimeout(() => {
        alert('Appointment requested successfully! The agent will confirm your appointment soon.');
        navigate('/properties');
      }, 1000);
    } catch (error) {
      console.error('Error requesting appointment:', error);
      alert('Failed to request appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle sending chat messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: user?.name || 'Customer',
      text: newMessage,
      timestamp: new Date(),
      isAgent: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate agent response (in a real app, this would be a backend call)
    setTimeout(() => {
      const agentResponses = [
        "Thank you for your message. I will get back to you soon with more information about this property.",
        "I'd be happy to schedule a viewing for you. Please select your preferred date and time.",
        "This property is still available. Would you like to arrange a visit this weekend?",
        "I can provide more details about the amenities and neighborhood. What specific information are you looking for?",
        "The price is negotiable. Are you interested in making an offer?",
        "I can send you more pictures of the property if you'd like."
      ];
      
      const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
      
      const agentResponse = {
        id: messages.length + 2,
        sender: property.agentName,
        text: randomResponse,
        timestamp: new Date(),
        isAgent: true
      };
      
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A085]"></div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600">Payment Required</h2>
          <p className="mt-2">You need to complete the payment before scheduling an appointment.</p>
          <button 
            onClick={() => navigate(`/property/${id}`)}
            className="mt-4 px-4 py-2 bg-[#16A085] text-white rounded-lg hover:bg-[#138871]"
          >
            Back to Property
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Schedule Appointment</h1>
          <p className="mt-2 text-gray-600">Fill in the details to request a property viewing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-[#16A085] to-[#2C3E50] p-6 text-white">
                <h2 className="text-xl font-bold mb-4">Property Information</h2>
                {property && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">{property.title}</h3>
                      <p className="text-sm text-teal-100">Property ID: {property.id}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-teal-700">
                      <h3 className="font-semibold mb-2">Agent Information</h3>
                      <p className="text-sm">{property.agentName}</p>
                      <p className="text-sm">{property.agentEmail}</p>
                      <p className="text-sm">{property.agentPhone}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-teal-700">
                      <h3 className="font-semibold mb-2">Payment Details</h3>
                      <p className="text-sm">Payment ID: {paymentData.paymentId}</p>
                      <p className="text-sm">Date: {new Date(paymentData.date).toLocaleDateString()}</p>
                      <p className="text-sm">Gateway: {paymentData.gateway}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700 font-medium">Payment Completed</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">You have successfully paid for this property viewing.</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-700 font-medium">Next Steps</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">Select your preferred date and time for the appointment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Appointment Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Appointment Details</h2>
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Formik 
                  initialValues={{ 
                    preferredTimes: [] 
                  }} 
                  validationSchema={appointmentRequestSchema} 
                  onSubmit={handleSubmit}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="space-y-6">
                      {/* Preferred Time Picker */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Date and Time
                        </label>
                        <div className="relative">
                          <DateTimePicker
                            label="Select date and time"
                            minDate={getToday()}
                            onChange={(date) => {
                              if (date) {
                                // Check if this time is already selected
                                const isAlreadySelected = values.preferredTimes.some(
                                  existingTime => existingTime.getTime() === date.getTime()
                                );
                                
                                if (!isAlreadySelected) {
                                  setFieldValue('preferredTimes', [...values.preferredTimes, date]);
                                }
                              }
                            }}
                            className="w-full"
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: 'outlined',
                                className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors'
                              }
                            }}
                          />
                        </div>
                        <ErrorMessage name="preferredTimes" component="div" className="mt-1 text-sm text-red-600" />
                        
                        {/* Display selected times */}
                        {values.preferredTimes.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700">Selected times:</p>
                            <ul className="mt-1 space-y-1">
                              {values.preferredTimes.map((time, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-center justify-between">
                                  <span>{formatDate(time)}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newTimes = values.preferredTimes.filter((_, i) => i !== index);
                                      setFieldValue('preferredTimes', newTimes);
                                    }}
                                    className="text-red-500 hover:text-red-700 ml-2"
                                  >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <CustomButton
                          type="submit"
                          disabled={submitting || values.preferredTimes.length === 0}
                          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                              </svg>
                              Request Appointment
                            </span>
                          )}
                        </CustomButton>
                        {values.preferredTimes.length === 0 && (
                          <p className="text-sm text-red-600 mt-2">Please select at least one preferred time slot</p>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </LocalizationProvider>
            </div>
          </div>

          {/* Right Column - Chat Box */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white p-4">
                <h3 className="font-bold">Chat with Agent</h3>
                <p className="text-sm text-teal-100">{property?.agentName}</p>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto max-h-[60vh]">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`mb-4 ${message.isAgent ? 'text-left' : 'text-right'}`}
                  >
                    <div 
                      className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                        message.isAgent 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-[#16A085] text-white'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isAgent ? 'text-gray-500' : 'text-teal-100'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat Input */}
              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#16A085] text-white rounded-lg hover:bg-[#138871] transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentRequestForm;