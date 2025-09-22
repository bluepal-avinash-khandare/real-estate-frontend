import api from './api';

export const initiatePayment = async (data) => {
  const response = await api.post('/payments/initiate', data);
  return response.data;
};

export const verifyPayment = async (data) => {
  const response = await api.post('/payments/verify', data);
  return response.data;
};

export const getPaymentHistory = async (params) => {
  const response = await api.get('/payments/history', { params });
  return response.data;
};