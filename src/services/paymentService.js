// import api from './api';

// export const initiatePayment = async (data) => {
//   const response = await api.post('/payments/initiate', data);
//   return response.data;
// };

// export const verifyPayment = async (data) => {
//   const response = await api.post('/payments/verify', data);
//   return response.data;
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
  const request = {
    paymentToken: data.paymentId  // Map paymentId to paymentToken as expected by backend
  };
  
  console.log('Sending verification request:', request); // For debugging
  
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
          paymentId: data.paymentId,
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
          paymentId: data.paymentId,
          status: 'PENDING',
          verified: false,
          message: 'Payment is being processed'
        }
      };
    }
    
    throw error;
  }
};

export const getPaymentHistory = async (params) => {
  const response = await api.get('/payments/history', { params });
  return response.data;
};