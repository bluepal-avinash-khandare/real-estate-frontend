import api from './api';

// Test if the API endpoint is accessible
export const testSubscriptionAPI = async () => {
  try {
    const response = await api.get('/subscription/plans?page=0&size=10');
    
    return {
      status: response.status,
      statusText: response.status,
      contentType: response.headers['content-type'],
      url: response.config.url
    };
  } catch (error) {
    return { 
      error: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      contentType: error.response?.headers['content-type']
    };
  }
};

// Get plans with better error handling
export const getSubscriptionPlans = async () => {
  try {
    const response = await api.get('/subscription/plans?page=0&size=100');
    return response.data;
  } catch (error) {
    console.error('Error in getSubscriptionPlans:', error);
    throw error;
  }
};

// Create subscription order
export const createSubscriptionOrder = async (planId) => {
  try {
    const response = await api.post('/subscription/subscribe', {
      planId: planId
    });
    return response.data;
  } catch (error) {
    console.error('Error creating subscription order:', error);
    throw error;
  }
};

// Verify payment and activate subscription
export const verifyPayment = async (paymentData) => {
  try {
    const response = await api.post('/subscription/verify-payment', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Update payment status
export const updatePaymentStatus = async (paymentData) => {
  try {
    const response = await api.post('/payments/update-status', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};