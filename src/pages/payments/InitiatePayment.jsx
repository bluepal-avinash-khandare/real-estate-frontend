// import React, { useState, useEffect, useContext } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthContext';
// import CustomButton from '../../components/common/CustomButton';
// import { initiatePayment } from '../../services/paymentService';

// const schema = Yup.object().shape({
//   amount: Yup.number().required('Amount is required').positive('Must be a positive number'),
//   gateway: Yup.string().required('Payment gateway is required'),
// });

// const InitiatePayment = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [paymentData, setPaymentData] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useContext(AuthContext);

//   // Load Razorpay script
//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.async = true;
//       script.onload = () => {
//         console.log('Razorpay script loaded');
//       };
//       document.body.appendChild(script);
//     };

//     loadRazorpayScript();
//   }, []);

//   // Get initial values from location state if available
//   const initialValues = {
//     amount: location.state?.amount || 0,
//     gateway: location.state?.gateway || '',
//   };

//   const handleSubmit = async (values) => {
//     setIsLoading(true);
//     setError(null);
//     setSuccess(false);
    
//     try {
//       // Check if user is authenticated
//       if (!isAuthenticated || !user) {
//         setError('User not authenticated. Please log in and try again.');
//         setIsLoading(false);
//         return;
//       }
      
//       // Get user ID from the authenticated user
//       const userId = user.userId || user.id;
      
//       if (!userId) {
//         setError('User ID not found. Please log in again.');
//         setIsLoading(false);
//         return;
//       }
      
//       // Add userId to the payment request
//       const paymentRequest = {
//         ...values,
//         userId: userId
//       };
      
//       // Call API to get payment order details
//       const response = await initiatePayment(paymentRequest);
//       setPaymentData(response.data);
      
//       // Process payment based on selected gateway
//       if (values.gateway === 'razorpay') {
//         processRazorpayPayment(response.data, values, location.state?.propertyId);
//       } else if (values.gateway === 'stripe') {
//         processStripePayment(response.data, location.state?.propertyId);
//       } else {
//         // For other gateways, just show success
//         setSuccess(true);
//         setTimeout(() => setSuccess(false), 3000);
//       }
//     } catch (error) {
//       console.error(error);
//       setError(error.response?.data?.message || 'Failed to initiate payment. Please check your details and try again.');
//       setTimeout(() => setError(null), 5000);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const processRazorpayPayment = (paymentData, formValues, propertyId) => {
//     // Razorpay key from environment or hardcoded
//     const razorpayKey = 'rzp_test_RBeFyHkTAK93Vw'; // Use your test key
    
//     // Convert amount to paise (1 INR = 100 paise)
//     const amountInPaise = formValues.amount * 100;
    
//     const options = {
//       key: razorpayKey, // Razorpay key ID
//       amount: amountInPaise, // Amount in paise
//       currency: 'INR',
//       name: 'Property Booking',
//       description: 'Payment for property viewing',
//       order_id: paymentData.order_id || '', // Order ID from your server
//       handler: function (response) {
//         // Handle payment success
//         handlePaymentSuccess(response, propertyId, 'razorpay');
//       },
//       prefill: {
//         name: user?.name || 'Customer Name',
//         email: user?.email || 'customer@example.com',
//         contact: user?.phone || '9999999999',
//       },
//       notes: {
//         address: 'Property Address',
//       },
//       theme: {
//         color: '#16A085',
//       },
//       modal: {
//         ondismiss: function() {
//           // Handle when user closes the payment modal without completing
//           setError('Payment was cancelled. Please try again.');
//           setTimeout(() => setError(null), 5000);
//         }
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   const processStripePayment = (paymentData, propertyId) => {
//     // For Stripe, we would typically use Stripe.js
//     // This is a simplified implementation
//     if (!window.Stripe) {
//       // Load Stripe.js if not already loaded
//       const script = document.createElement('script');
//       script.src = 'https://js.stripe.com/v3/';
//       script.async = true;
//       script.onload = () => {
//         initializeStripePayment(paymentData, propertyId);
//       };
//       document.body.appendChild(script);
//     } else {
//       initializeStripePayment(paymentData, propertyId);
//     }
//   };

//   const initializeStripePayment = (paymentData, propertyId) => {
//     const stripeKey = 'pk_test_51Rx5wCB7SwmK5WWYZq1uYTqAeD81KWuixQ0KhmsxLRR2lka6lFIG1iYOerKdjMCE2u2xSbTlnWGEo5U3bpDvfVTi0058kw0AkQ'; // Use your test key
    
//     const stripe = window.Stripe(stripeKey);
    
//     // Redirect to Stripe Checkout
//     stripe.redirectToCheckout({
//       sessionId: paymentData.session_id
//     }).then(function (result) {
//       // If `redirectToCheckout` fails due to a browser or network error
//       // display the localized error message to your customer
//       if (result.error) {
//         setError(result.error.message);
//         setTimeout(() => setError(null), 5000);
//       }
//     }).catch(function (error) {
//       console.error('Stripe error:', error);
//       setError('Failed to initiate Stripe payment. Please try again.');
//       setTimeout(() => setError(null), 5000);
//     });
//   };

//   // const handlePaymentSuccess = (paymentResponse, propertyId, gateway) => {
//   //   // Store payment status in localStorage
//   //   const paymentData = {
//   //     paid: true,
//   //     paymentId: paymentResponse.razorpay_payment_id || paymentResponse.payment_intent_id,
//   //     gateway: gateway,
//   //     propertyId: propertyId,
//   //     date: new Date().toISOString()
//   //   };
    
//   //   localStorage.setItem(`payment_${propertyId}`, JSON.stringify(paymentData));
    
//   //   // Show success message
//   //   setSuccess(true);
    
//   //   // Navigate to appointment page after a short delay
//   //   setTimeout(() => {
//   //     navigate('/request-appointment');
//   //   }, 2000);
//   // };

//   // In the handlePaymentSuccess function, update the localStorage key to include user ID
// const handlePaymentSuccess = (paymentResponse, propertyId, gateway) => {
//   // Store payment status in localStorage with user-specific key
//   const userId = user.userId || user.id;
//   const paymentKey = `payment_${propertyId}_user_${userId}`;
  
//   const paymentData = {
//     paid: true,
//     paymentId: paymentResponse.razorpay_payment_id || paymentResponse.payment_intent_id,
//     gateway: gateway,
//     propertyId: propertyId,
//     userId: userId,
//     date: new Date().toISOString()
//   };
  
//   localStorage.setItem(paymentKey, JSON.stringify(paymentData));
  
//   // Show success message
//   setSuccess(true);
  
//   // Navigate to appointment page after a short delay
//   setTimeout(() => {
//     navigate('/request-appointment');
//   }, 2000);
// };
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto w-full">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
//             Secure Payment Processing
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Initiate secure payments with Razorpay and Stripe payment gateways
//           </p>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="md:flex">
//             {/* Left Side - Payment Gallery */}
//             <div className="md:w-2/5 bg-gradient-to-br from-[#16A085] to-[#2C3E50] p-8">
//               <div className="h-full flex flex-col">
//                 <h2 className="text-2xl font-bold text-white mb-6">Trusted Payment Solutions</h2>
                
//                 {/* Gallery Grid */}
//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div className="bg-white bg-opacity-20 rounded-lg p-4 flex items-center justify-center">
//                     <img 
//                       src="https://cdn.pixabay.com/photo/2016/03/31/18/36/visa-1294421_960_720.png" 
//                       alt="Visa" 
//                       className="h-16 w-16 object-contain" 
//                     />
//                   </div>
//                   <div className="bg-white bg-opacity-20 rounded-lg p-4 flex items-center justify-center">
//                     <img 
//                       src="https://cdn.pixabay.com/photo/2016/03/31/18/36/mastercard-1294420_960_720.png" 
//                       alt="Mastercard" 
//                       className="h-16 w-16 object-contain" 
//                     />
//                   </div>
//                   <div className="bg-white bg-opacity-20 rounded-lg p-4 flex items-center justify-center">
//                     <img 
//                       src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_960_720.png" 
//                       alt="PayPal" 
//                       className="h-16 w-16 object-contain" 
//                     />
//                   </div>
//                   <div className="bg-white bg-opacity-20 rounded-lg p-4 flex items-center justify-center">
//                     <img 
//                       src="https://cdn.pixabay.com/photo/2017/05/15/23/19/apple-pay-2316447_960_720.png" 
//                       alt="Apple Pay" 
//                       className="h-16 w-16 object-contain" 
//                     />
//                   </div>
//                 </div>
                
//                 {/* Payment Gateway Logos */}
//                 <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
//                   <h3 className="font-bold text-white mb-3">Our Payment Partners</h3>
//                   <div className="flex justify-around">
//                     <img 
//                       src="https://cdn.pixabay.com/photo/2021/10/11/16/51/razorpay-6699221_960_720.png" 
//                       alt="Razorpay" 
//                       className="h-12 w-12 object-contain" 
//                     />
//                     <img 
//                       src="https://cdn.pixabay.com/photo/2020/04/30/17/17/stripe-5112726_960_720.png" 
//                       alt="Stripe" 
//                       className="h-12 w-12 object-contain" 
//                     />
//                   </div>
//                 </div>
                
//                 {/* Security Features */}
//                 <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
//                   <h3 className="font-bold text-white mb-2">Security Features</h3>
//                   <ul className="text-teal-100 space-y-2">
//                     <li className="flex items-center">
//                       <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                       </svg>
//                       <span>256-bit SSL encryption</span>
//                     </li>
//                     <li className="flex items-center">
//                       <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                       </svg>
//                       <span>Fraud detection system</span>
//                     </li>
//                     <li className="flex items-center">
//                       <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                       </svg>
//                       <span>PCI DSS compliance</span>
//                     </li>
//                   </ul>
//                 </div>
                
//                 {/* Payment Process Steps */}
//                 <div className="mt-auto">
//                   <h3 className="font-bold text-white mb-2">Simple Process</h3>
//                   <div className="flex items-center text-teal-100">
//                     <div className="flex flex-col items-center">
//                       <div className="h-8 w-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center">1</div>
//                       <div className="text-xs mt-1">Enter Details</div>
//                     </div>
//                     <div className="h-0.5 bg-white bg-opacity-30 flex-1 mx-2"></div>
//                     <div className="flex flex-col items-center">
//                       <div className="h-8 w-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center">2</div>
//                       <div className="text-xs mt-1">Confirm</div>
//                     </div>
//                     <div className="h-0.5 bg-white bg-opacity-30 flex-1 mx-2"></div>
//                     <div className="flex flex-col items-center">
//                       <div className="h-8 w-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center">3</div>
//                       <div className="text-xs mt-1">Complete</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Payment Form */}
//             <div className="md:w-3/5 p-8">
//               <div className="mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Initiate Payment</h2>
//                 <p className="text-gray-600">
//                   Enter the payment details below to process a secure transaction.
//                 </p>
//               </div>
              
//               <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
//                 {() => (
//                   <Form className="space-y-6">
//                     {/* Amount Field */}
//                     <div>
//                       <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
//                         Amount (₹)
//                       </label>
//                       <div className="mt-1 relative rounded-md shadow-sm">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                             <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.313 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.313-1.076-2.354-1.253V5z" clipRule="evenodd" />
//                           </svg>
//                         </div>
//                         <Field
//                           id="amount"
//                           name="amount"
//                           type="number"
//                           placeholder="0.00"
//                           className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
//                         />
//                       </div>
//                       <ErrorMessage name="amount" component="div" className="mt-1 text-sm text-red-600" />
//                     </div>

//                     {/* Gateway Field */}
//                     <div>
//                       <label htmlFor="gateway" className="block text-sm font-medium text-gray-700 mb-1">
//                         Payment Gateway
//                       </label>
//                       <div className="mt-1 relative rounded-md shadow-sm">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                           </svg>
//                         </div>
//                         <Field
//                           id="gateway"
//                           name="gateway"
//                           as="select"
//                           className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
//                         >
//                           <option value="">Select Payment Gateway</option>
//                           <option value="razorpay">Razorpay</option>
//                           <option value="stripe">Stripe</option>
//                           <option value="paypal">PayPal</option>
//                           <option value="square">Square</option>
//                         </Field>
//                       </div>
//                       <ErrorMessage name="gateway" component="div" className="mt-1 text-sm text-red-600" />
//                     </div>

//                     {/* Submit Button */}
//                     <div>
//                       <CustomButton
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all"
//                       >
//                         {isLoading ? (
//                           <span className="flex items-center">
//                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Processing...
//                           </span>
//                         ) : (
//                           <span className="flex items-center">
//                             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
//                             </svg>
//                             Initiate Payment
//                           </span>
//                         )}
//                       </CustomButton>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
              
//               {/* Status Messages */}
//               {success && (
//                 <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
//                   <div className="flex">
//                     <div className="flex-shrink-0">
//                       <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm text-green-700">
//                         Payment successful! Redirecting to appointment page...
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {error && (
//                 <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
//                   <div className="flex">
//                     <div className="flex-shrink-0">
//                       <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm text-red-700">
//                         {error}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <svg className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <p className="text-sm text-gray-600">
//                       Need assistance with payments? Contact our support team at <a href="mailto:support@example.com" className="font-medium text-[#16A085] hover:text-[#138871]">support@example.com</a> or call <span className="font-medium text-[#16A085]">+1 (555) 123-4567</span>.
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
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Secure Transactions</h3>
//             </div>
//             <p className="text-gray-600">All payments are processed through secure, encrypted channels to protect sensitive data.</p>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-green-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Multiple Gateways</h3>
//             </div>
//             <p className="text-gray-600">Support for multiple payment gateways including Razorpay and Stripe to provide flexibility.</p>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-purple-100 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Detailed Reports</h3>
//             </div>
//             <p className="text-gray-600">Comprehensive payment reports and analytics to track all transactions.</p>
//           </div>
//         </div>

//         {/* Loading Overlay */}
//         {isLoading && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
//               <svg className="animate-spin h-10 w-10 text-[#16A085] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               <p className="text-gray-700">Processing payment...</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InitiatePayment;
import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import CustomButton from '../../components/common/CustomButton';
import { initiatePayment, verifyPayment } from '../../services/paymentService';

const schema = Yup.object().shape({
  amount: Yup.number().required('Amount is required').positive('Must be a positive number'),
  gateway: Yup.string().required('Payment gateway is required'),
});

const InitiatePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [paymentVerificationStatus, setPaymentVerificationStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay script loaded');
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  // Get initial values from location state if available
  const initialValues = {
    amount: location.state?.amount || 0,
    gateway: location.state?.gateway || '',
  };

  // const handleSubmit = async (values) => {
  //   setIsLoading(true);
  //   setError(null);
  //   setSuccess(false);
  //   setPaymentVerificationStatus(null);
    
  //   try {
  //     // Check if user is authenticated
  //     if (!isAuthenticated || !user) {
  //       setError('User not authenticated. Please log in and try again.');
  //       setIsLoading(false);
  //       return;
  //     }
      
  //     // Get user ID from the authenticated user
  //     const userId = user.userId || user.id;
      
  //     if (!userId) {
  //       setError('User ID not found. Please log in again.');
  //       setIsLoading(false);
  //       return;
  //     }
      
  //     // Add userId to the payment request
  //     const paymentRequest = {
  //       ...values,
  //       userId: userId
  //     };
      
  //     // Call API to get payment order details
  //     const response = await initiatePayment(paymentRequest);
  //     setPaymentData(response.data);
      
  //     // Process payment based on selected gateway
  //     if (values.gateway === 'razorpay') {
  //       processRazorpayPayment(response.data, values, location.state?.propertyId);
  //     } else if (values.gateway === 'stripe') {
  //       processStripePayment(response.data, location.state?.propertyId);
  //     } else {
  //       // For other gateways, just show success
  //       setSuccess(true);
  //       setTimeout(() => setSuccess(false), 3000);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setError(error.response?.data?.message || 'Failed to initiate payment. Please check your details and try again.');
  //     setTimeout(() => setError(null), 5000);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
const handleSubmit = async (values) => {
  setIsLoading(true);
  setError(null);
  setSuccess(false);
  setPaymentVerificationStatus(null);
  
  try {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      setError('User not authenticated. Please log in and try again.');
      setIsLoading(false);
      return;
    }
    
    // Get user ID from the authenticated user
    const userId = user.userId || user.id;
    
    if (!userId) {
      setError('User ID not found. Please log in again.');
      setIsLoading(false);
      return;
    }
    
    // Add userId to the payment request
    const paymentRequest = {
      ...values,
      userId: userId
    };
    
    // Call API to get payment order details
    const response = await initiatePayment(paymentRequest);
    setPaymentData(response.data);
    
    // Store the initial payment data in localStorage
    const paymentKey = `payment_${location.state?.propertyId}_user_${userId}`;
    const initialPaymentData = {
      paid: false,
      paymentId: response.data.paymentId, // This is the order ID from the backend
      gateway: values.gateway,
      propertyId: location.state?.propertyId,
      userId: userId,
      date: new Date().toISOString()
    };
    localStorage.setItem(paymentKey, JSON.stringify(initialPaymentData));
    
    // Process payment based on selected gateway
    if (values.gateway === 'razorpay') {
      processRazorpayPayment(response.data, values, location.state?.propertyId);
    } else if (values.gateway === 'stripe') {
      processStripePayment(response.data, location.state?.propertyId);
    } else {
      // For other gateways, just show success
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  } catch (error) {
    console.error(error);
    setError(error.response?.data?.message || 'Failed to initiate payment. Please check your details and try again.');
    setTimeout(() => setError(null), 5000);
  } finally {
    setIsLoading(false);
  }
};
  const processRazorpayPayment = (paymentData, formValues, propertyId) => {
    // Razorpay key from environment or hardcoded
    const razorpayKey = 'rzp_test_RBeFyHkTAK93Vw'; // Use your test key
    
    // Convert amount to paise (1 INR = 100 paise)
    const amountInPaise = formValues.amount * 100;
    
    const options = {
      key: razorpayKey, // Razorpay key ID
      amount: amountInPaise, // Amount in paise
      currency: 'INR',
      name: 'Property Booking',
      description: 'Payment for property viewing',
      order_id: paymentData.order_id || '', // Order ID from your server
      handler: function (response) {
        // Handle payment success
        handlePaymentSuccess(response, propertyId, 'razorpay');
      },
      prefill: {
        name: user?.name || 'Customer Name',
        email: user?.email || 'customer@example.com',
        contact: user?.phone || '9999999999',
      },
      notes: {
        address: 'Property Address',
      },
      theme: {
        color: '#16A085',
      },
      modal: {
        ondismiss: function() {
          // Handle when user closes the payment modal without completing
          setError('Payment was cancelled. Please try again.');
          setTimeout(() => setError(null), 5000);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const processStripePayment = (paymentData, propertyId) => {
    // For Stripe, we would typically use Stripe.js
    // This is a simplified implementation
    if (!window.Stripe) {
      // Load Stripe.js if not already loaded
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.onload = () => {
        initializeStripePayment(paymentData, propertyId);
      };
      document.body.appendChild(script);
    } else {
      initializeStripePayment(paymentData, propertyId);
    }
  };

  const initializeStripePayment = (paymentData, propertyId) => {
    const stripeKey = 'pk_test_51Rx5wCB7SwmK5WWYZq1uYTqAeD81KWuixQ0KhmsxLRR2lka6lFIG1iYOerKdjMCE2u2xSbTlnWGEo5U3bpDvfVTi0058kw0AkQ'; // Use your test key
    
    const stripe = window.Stripe(stripeKey);
    
    // Redirect to Stripe Checkout
    stripe.redirectToCheckout({
      sessionId: paymentData.session_id
    }).then(function (result) {
      // If `redirectToCheckout` fails due to a browser or network error
      // display the localized error message to your customer
      if (result.error) {
        setError(result.error.message);
        setTimeout(() => setError(null), 5000);
      }
    }).catch(function (error) {
      console.error('Stripe error:', error);
      setError('Failed to initiate Stripe payment. Please try again.');
      setTimeout(() => setError(null), 5000);
    });
  };

  // const handlePaymentSuccess = async (paymentResponse, propertyId, gateway) => {
  //   setIsLoading(true);
    
  //   try {
  //     // Verify payment with backend
  //     const verificationResponse = await verifyPayment({ 
  //       paymentId: paymentResponse.razorpay_payment_id || paymentResponse.payment_intent_id,
  //       gateway: gateway
  //     });
      
  //     if (verificationResponse.success && verificationResponse.data.verified) {
  //       // Store payment status in localStorage with user-specific key
  //       const userId = user.userId || user.id;
  //       const paymentKey = `payment_${propertyId}_user_${userId}`;
        
  //       const paymentData = {
  //         paid: true,
  //         paymentId: paymentResponse.razorpay_payment_id || paymentResponse.payment_intent_id,
  //         gateway: gateway,
  //         propertyId: propertyId,
  //         userId: userId,
  //         date: new Date().toISOString()
  //       };
        
  //       localStorage.setItem(paymentKey, JSON.stringify(paymentData));
        
  //       // Show success message
  //       setSuccess(true);
  //       setPaymentVerificationStatus('verified');
        
  //       // Navigate to appointment page after a short delay
  //       setTimeout(() => {
  //         navigate('/request-appointment');
  //       }, 2000);
  //     } else {
  //       throw new Error('Payment verification failed');
  //     }
  //   } catch (error) {
  //     console.error('Payment verification error:', error);
      
  //     // Handle specific error messages from the backend
  //     let errorMessage = 'Payment verification failed. Please contact support.';
      
  //     if (error.response && error.response.data) {
  //       const errorData = error.response.data;
  //       if (errorData.errors && errorData.errors.length > 0) {
  //         errorMessage = errorData.errors[0];
  //       } else if (errorData.message) {
  //         errorMessage = errorData.message;
  //       }
  //     }
      
  //     setError(errorMessage);
  //     setPaymentVerificationStatus('failed');
  //     setTimeout(() => setError(null), 5000);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
const handlePaymentSuccess = async (paymentResponse, propertyId, gateway) => {
  setIsLoading(true);
  
  try {
    // Get payment ID from response
    const gatewayPaymentId = paymentResponse.razorpay_payment_id || paymentResponse.payment_intent_id;
    console.log('Payment successful with gateway payment ID:', gatewayPaymentId);
    
    // Get the stored payment data which contains the original payment ID (order ID)
    const userId = user.userId || user.id;
    const paymentKey = `payment_${propertyId}_user_${userId}`;
    const paymentDataString = localStorage.getItem(paymentKey);
    
    if (!paymentDataString) {
      throw new Error('Payment data not found in localStorage');
    }
    
    const paymentData = JSON.parse(paymentDataString);
    
    // Update the payment data with the gateway payment ID
    paymentData.gatewayPaymentId = gatewayPaymentId;
    paymentData.date = new Date().toISOString();
    
    // Save back to localStorage
    localStorage.setItem(paymentKey, JSON.stringify(paymentData));
    
    // Verify payment with backend using the original payment ID (order ID)
    console.log('Verifying payment with original payment ID:', paymentData.paymentId);
    const verificationResponse = await verifyPayment({ paymentId: paymentData.paymentId });
    console.log('Verification response:', verificationResponse);
    
    if (verificationResponse.success && verificationResponse.data.verified) {
      // Payment is verified
      paymentData.paid = true;
      paymentData.status = 'PAID';
    } else if (verificationResponse.data.status === 'PENDING') {
      // Payment is pending
      paymentData.paid = false;
      paymentData.status = 'PENDING';
    } else {
      throw new Error('Payment verification failed');
    }
    
    // Save the updated payment data
    localStorage.setItem(paymentKey, JSON.stringify(paymentData));
    
    // Show success message
    setSuccess(true);
    setPaymentVerificationStatus(verificationResponse.data.verified ? 'verified' : 'pending');
    
    // Navigate to appointment page after a short delay
    setTimeout(() => {
      navigate('/request-appointment');
    }, 2000);
  } catch (error) {
    console.error('Payment verification error:', error);
    
    // Handle specific error messages from the backend
    let errorMessage = 'Payment verification failed. Please contact support.';
    
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      console.error('Error response data:', errorData);
      
      if (errorData.errors && errorData.errors.length > 0) {
        errorMessage = errorData.errors[0];
      } else if (errorData.message) {
        errorMessage = errorData.message;
      } else if (typeof errorData === 'string') {
        errorMessage = errorData;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setError(errorMessage);
    setPaymentVerificationStatus('failed');
    setTimeout(() => setError(null), 5000);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Secure Payment Processing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Initiate secure payments with Razorpay and Stripe payment gateways
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Payment Gallery */}
            <div className="md:w-2/5 bg-gradient-to-br from-[#16A085] to-[#2C3E50] p-8">
              <div className="h-full flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-6">Trusted Payment Solutions</h2>
                
                {/* Gallery Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 flex items-center justify-center">
                    <img 
                      src="https://cdn.pixabay.com/photo/2016/03/31/18/36/visa-1294421_960_720.png" 
                      alt="Visa" 
                      className="h-16 w-16 object-contain" 
                    />
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 flex items-center justify-center">
                    <img 
                      src="https://cdn.pixabay.com/photo/2016/03/31/18/36/mastercard-1294420_960_720.png" 
                      alt="Mastercard" 
                      className="h-16 w-16 object-contain" 
                    />
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 flex items-center justify-center">
                    <img 
                      src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_960_720.png" 
                      alt="PayPal" 
                      className="h-16 w-16 object-contain" 
                    />
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 flex items-center justify-center">
                    <img 
                      src="https://cdn.pixabay.com/photo/2017/05/15/23/19/apple-pay-2316447_960_720.png" 
                      alt="Apple Pay" 
                      className="h-16 w-16 object-contain" 
                    />
                  </div>
                </div>
                
                {/* Payment Gateway Logos */}
                <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-white mb-3">Our Payment Partners</h3>
                  <div className="flex justify-around">
                    <img 
                      src="https://cdn.pixabay.com/photo/2021/10/11/16/51/razorpay-6699221_960_720.png" 
                      alt="Razorpay" 
                      className="h-12 w-12 object-contain" 
                    />
                    <img 
                      src="https://cdn.pixabay.com/photo/2020/04/30/17/17/stripe-5112726_960_720.png" 
                      alt="Stripe" 
                      className="h-12 w-12 object-contain" 
                    />
                  </div>
                </div>
                
                {/* Security Features */}
                <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-white mb-2">Security Features</h3>
                  <ul className="text-teal-100 space-y-2">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>256-bit SSL encryption</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Fraud detection system</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>PCI DSS compliance</span>
                    </li>
                  </ul>
                </div>
                
                {/* Payment Process Steps */}
                <div className="mt-auto">
                  <h3 className="font-bold text-white mb-2">Simple Process</h3>
                  <div className="flex items-center text-teal-100">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center">1</div>
                      <div className="text-xs mt-1">Enter Details</div>
                    </div>
                    <div className="h-0.5 bg-white bg-opacity-30 flex-1 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center">2</div>
                      <div className="text-xs mt-1">Confirm</div>
                    </div>
                    <div className="h-0.5 bg-white bg-opacity-30 flex-1 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center">3</div>
                      <div className="text-xs mt-1">Complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Payment Form */}
            <div className="md:w-3/5 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Initiate Payment</h2>
                <p className="text-gray-600">
                  Enter the payment details below to process a secure transaction.
                </p>
              </div>
              
              <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
                {() => (
                  <Form className="space-y-6">
                    {/* Amount Field */}
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (₹)
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.313 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.313-1.076-2.354-1.253V5z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <Field
                          id="amount"
                          name="amount"
                          type="number"
                          placeholder="0.00"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                        />
                      </div>
                      <ErrorMessage name="amount" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    {/* Gateway Field */}
                    <div>
                      <label htmlFor="gateway" className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Gateway
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <Field
                          id="gateway"
                          name="gateway"
                          as="select"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                        >
                          <option value="">Select Payment Gateway</option>
                          <option value="razorpay">Razorpay</option>
                          <option value="stripe">Stripe</option>
                          <option value="paypal">PayPal</option>
                          <option value="square">Square</option>
                        </Field>
                      </div>
                      <ErrorMessage name="gateway" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    {/* Submit Button */}
                    <div>
                      <CustomButton
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all"
                      >
                        {isLoading ? (
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                            Initiate Payment
                          </span>
                        )}
                      </CustomButton>
                    </div>
                  </Form>
                )}
              </Formik>
              
              {/* Status Messages */}
              {success && (
                <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        {paymentVerificationStatus === 'verified' 
                          ? 'Payment successful and verified! Redirecting to appointment page...' 
                          : 'Payment initiated successfully!'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        {error}
                      </p>
                      {paymentVerificationStatus === 'failed' && (
                        <button
                          onClick={() => window.location.reload()}
                          className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">
                      Need assistance with payments? Contact our support team at <a href="mailto:support@example.com" className="font-medium text-[#16A085] hover:text-[#138871]">support@example.com</a> or call <span className="font-medium text-[#16A085]">+1 (555) 123-4567</span>.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Secure Transactions</h3>
            </div>
            <p className="text-gray-600">All payments are processed through secure, encrypted channels to protect sensitive data.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Multiple Gateways</h3>
            </div>
            <p className="text-gray-600">Support for multiple payment gateways including Razorpay and Stripe to provide flexibility.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Detailed Reports</h3>
            </div>
            <p className="text-gray-600">Comprehensive payment reports and analytics to track all transactions.</p>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-[#16A085] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-700">Processing payment...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InitiatePayment;