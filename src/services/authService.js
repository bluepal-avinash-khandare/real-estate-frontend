import api from './api';

export const login = async (data) => {
  const response = await api.post('/auth/signin', data);
  return response.data;
};

export const register = async (data) => {
  const response = await api.post('/auth/signup', data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await api.post('/auth/forgot-password', data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post('/auth/reset-password', data);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};