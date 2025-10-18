// // import api from './api';

// // export const initiatePayment = async (data) => {
// //   const response = await api.post('/payments/initiate', data);
// //   return response.data;
// // };

// // export const verifyPayment = async (data) => {
// //   const response = await api.post('/payments/verify', data);
// //   return response.data;
// // };

// // export const getPaymentHistory = async (params) => {
// //   const response = await api.get('/payments/history', { params });
// //   return response.data;
// // // };
// // import api from './api';

// // export const initiatePayment = async (data) => {
// //   const response = await api.post('/payments/initiate', data);
// //   return response.data;
// // };

// // export const verifyPayment = async (data) => {
// //   // The backend expects a PaymentVerifyRequestDto with a paymentToken field
// //   const request = {
// //     paymentToken: data.paymentId  // Map paymentId to paymentToken as expected by backend
// //   };
  
// //   console.log('Sending verification request:', request); // For debugging
  
// //   try {
// //     const response = await api.post('/payments/verify', request);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Verification error response:', error.response?.data);
    
// //     // If the error is that payment is not in PAID status, we'll consider it as pending
// //     if (error.response && error.response.status === 400 && 
// //         error.response.data && error.response.data.message && 
// //         error.response.data.message.includes("Payment is not in PAID status")) {
// //       console.log('Payment is still pending, returning pending status');
// //       return {
// //         success: true,
// //         data: {
// //           paymentId: data.paymentId,
// //           status: 'PENDING',
// //           verified: false, // Not verified yet, but payment exists
// //           message: 'Payment is being processed'
// //         }
// //       };
// //     }
    
// //     // If the error is "Invalid payment token", we'll try to see if we have a pending payment
// //     if (error.response && error.response.status === 400 && 
// //         error.response.data && error.response.data.message && 
// //         error.response.data.message.includes("Invalid payment token")) {
// //       console.log('Payment token not found, but we have a pending payment');
// //       return {
// //         success: true,
// //         data: {
// //           paymentId: data.paymentId,
// //           status: 'PENDING',
// //           verified: false,
// //           message: 'Payment is being processed'
// //         }
// //       };
// //     }
    
// //     throw error;
// //   }
// // };

// // export const getPaymentHistory = async (params) => {
// //   const response = await api.get('/payments/history', { params });
// //   return response.data;
// // };


// // // paymentService.js
// // import api from './api';

// // export const initiatePayment = async (data) => {
// //   const response = await api.post('/payments/initiate', data);
// //   return response.data;
// // };

// // export const verifyPayment = async (data) => {
// //   // The backend expects a PaymentVerifyRequestDto with a paymentToken field
// //   const request = {
// //     paymentToken: data.paymentId || data.paymentToken // Support both paymentId and paymentToken
// //   };
  
// //   console.log('Sending verification request:', request); // For debugging
  
// //   try {
// //     const response = await api.post('/payments/verify', request);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Verification error response:', error.response?.data);
    
// //     // If the error is that payment is not in PAID status, we'll consider it as pending
// //     if (error.response && error.response.status === 400 && 
// //         error.response.data && error.response.data.message && 
// //         error.response.data.message.includes("Payment is not in PAID status")) {
// //       console.log('Payment is still pending, returning pending status');
// //       return {
// //         success: true,
// //         data: {
// //           paymentId: data.paymentId || data.paymentToken,
// //           status: 'PENDING',
// //           verified: false, // Not verified yet, but payment exists
// //           message: 'Payment is being processed'
// //         }
// //       };
// //     }
    
// //     // If the error is "Invalid payment token", we'll try to see if we have a pending payment
// //     if (error.response && error.response.status === 400 && 
// //         error.response.data && error.response.data.message && 
// //         error.response.data.message.includes("Invalid payment token")) {
// //       console.log('Payment token not found, but we have a pending payment');
// //       return {
// //         success: true,
// //         data: {
// //           paymentId: data.paymentId || data.paymentToken,
// //           status: 'PENDING',
// //           verified: false,
// //           message: 'Payment is being processed'
// //         }
// //       };
// //     }
    
// //     throw error;
// //   }
// // };

// // export const getPaymentHistory = async (params) => {
// //   const response = await api.get('/payments/history', { params });
// //   return response.data;
// // };

// import api from './api';

// export const initiatePayment = async (data) => {
//   const response = await api.post('/payments/initiate', data);
//   return response.data;
// };

// export const verifyPayment = async (data) => {
//   // The backend expects a PaymentVerifyRequestDto with a paymentToken field
//   let request;
  
//   if (data.paymentToken) {
//     request = {
//       paymentToken: data.paymentToken
//     };
//   } else if (data.paymentId) {
//     request = {
//       paymentToken: data.paymentId
//     };
//   } else {
//     throw new Error('No payment token or ID provided');
//   }
  
//   console.log('Sending verification request:', request);
  
//   try {
//     const response = await api.post('/payments/verify', request);
//     return response.data;
//   } catch (error) {
//     console.error('Verification error response:', error.response?.data);
    
//     // If the error is that payment is not in PAID status, we'll consider it as pending
//     if (error.response && error.response.status === 400 && 
//         error.response.data && error.response.data.message && 
//         error.response.data.message.includes("Payment is not in PAID status")) {
//       console.log('Payment is still pending, returning pending status');
//       return {
//         success: true,
//         data: {
//           paymentId: data.paymentId || data.paymentToken,
//           status: 'PENDING',
//           verified: false, // Not verified yet, but payment exists
//           message: 'Payment is being processed'
//         }
//       };
//     }
    
//     // If the error is "Invalid payment token", we'll try to see if we have a pending payment
//     if (error.response && error.response.status === 400 && 
//         error.response.data && error.response.data.message && 
//         error.response.data.message.includes("Invalid payment token")) {
//       console.log('Payment token not found, but we have a pending payment');
//       return {
//         success: true,
//         data: {
//           paymentId: data.paymentId || data.paymentToken,
//           status: 'PENDING',
//           verified: false,
//           message: 'Payment is being processed'
//         }
//       };
//     }
    
//     throw error;
//   }
// };

// // New function that tries both payment identifiers
// export const verifyPaymentWithFallback = async (gatewayPaymentId, originalPaymentId) => {
//   console.log('Verifying payment with fallback, gateway ID:', gatewayPaymentId, 'original ID:', originalPaymentId);
  
//   try {
//     // First try with the gateway payment ID
//     console.log('Trying verification with gateway payment ID');
//     const response = await verifyPayment({ paymentId: gatewayPaymentId });
//     console.log('Verification with gateway payment ID successful');
//     return response;
//   } catch (error) {
//     console.log('Verification with gateway payment ID failed, trying original payment ID');
    
//     // If that fails, try with the original payment ID
//     if (error.response && error.response.status === 400 && 
//         error.response.data && error.response.data.message && 
//         error.response.data.message.includes("Invalid payment token")) {
//       try {
//         const response = await verifyPayment({ paymentId: originalPaymentId });
//         console.log('Verification with original payment ID successful');
//         return response;
//       } catch (innerError) {
//         console.error('Both verification attempts failed');
//         throw innerError;
//       }
//     } else {
//       throw error;
//     }
//   }
// };

// export const getPaymentHistory = async (params) => {
//   const response = await api.get('/payments/history', { params });
//   return response.data;
// };


import api from './api';

export const initiatePayment = async (data) => {
  const response = await api.post('/payments/initiate', data);
  return response.data;
};

export const verifyPayment = async (data) => {
  // The backend expects a PaymentVerifyRequestDto with a paymentToken field
  let request;
  
  if (data.paymentToken) {
    request = {
      paymentToken: data.paymentToken
    };
  } else if (data.paymentId) {
    request = {
      paymentToken: data.paymentId
    };
  } else {
    throw new Error('No payment token or ID provided');
  }
  
  console.log('Sending verification request:', request);
  
  try {
    const response = await api.post('/payments/verify', request);
    return response.data;
  } catch (error) {
    console.error('Verification error response:', error.response?.data);
    
    // If the error is that payment is not in PAID status, we'll consider it as pending
    if (error.response && error.response.status === 400 && 
        error.response.data && error.response.data.message && 
        error.response.data.message.includes("Payment is not in PAID status")) {
      console.log('Payment is still pending, returning pending status');
      return {
        success: true,
        data: {
          paymentId: data.paymentId || data.paymentToken,
          status: 'PENDING',
          verified: false, // Not verified yet, but payment exists
          message: 'Payment is being processed'
        }
      };
    }
    
    // If the error is "Invalid payment token", we'll try to see if we have a pending payment
    if (error.response && error.response.status === 400 && 
        error.response.data && error.response.data.message && 
        error.response.data.message.includes("Invalid payment token")) {
      console.log('Payment token not found, but we have a pending payment');
      return {
        success: true,
        data: {
          paymentId: data.paymentId || data.paymentToken,
          status: 'PENDING',
          verified: false,
          message: 'Payment is being processed'
        }
      };
    }
    
    throw error;
  }
};

// New function that tries both payment identifiers
export const verifyPaymentWithFallback = async (gatewayPaymentId, originalPaymentId) => {
  console.log('Verifying payment with fallback, gateway ID:', gatewayPaymentId, 'original ID:', originalPaymentId);
  
  try {
    // First try with the gateway payment ID
    console.log('Trying verification with gateway payment ID');
    const response = await verifyPayment({ paymentId: gatewayPaymentId });
    console.log('Verification with gateway payment ID successful');
    return response;
  } catch (error) {
    console.log('Verification with gateway payment ID failed, trying original payment ID');
    
    // If that fails, try with the original payment ID
    if (error.response && error.response.status === 400 && 
        error.response.data && error.response.data.message && 
        error.response.data.message.includes("Invalid payment token")) {
      try {
        const response = await verifyPayment({ paymentId: originalPaymentId });
        console.log('Verification with original payment ID successful');
        return response;
      } catch (innerError) {
        console.error('Both verification attempts failed');
        throw innerError;
      }
    } else {
      throw error;
    }
  }
};

// Function to check payment status with Razorpay directly
export const checkRazorpayPaymentStatus = async (paymentId) => {
  console.log('Checking payment status with Razorpay directly, payment ID:', paymentId);
  
  try {
    // This would typically be done on the backend to keep the API key secure
    // For now, we'll simulate a call to the backend
    const response = await api.get(`/payments/razorpay-status/${paymentId}`);
    console.log('Razorpay status check response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Razorpay status check failed:', error);
    throw error;
  }
};

// Function to capture a payment with Razorpay
export const captureRazorpayPayment = async (paymentId, amount) => {
  console.log('Capturing Razorpay payment, payment ID:', paymentId, 'amount:', amount);
  
  try {
    // This would typically be done on the backend to keep the API key secure
    // For now, we'll simulate a call to the backend
    const response = await api.post('/payments/razorpay-capture', {
      paymentId,
      amount
    });
    console.log('Razorpay capture response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Razorpay capture failed:', error);
    throw error;
  }
};

export const getPaymentHistory = async (params) => {
  const response = await api.get('/payments/history', { params });
  return response.data;
};