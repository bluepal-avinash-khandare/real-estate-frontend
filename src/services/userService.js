import api from './api';

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const getUserByEmail = async (email) => {
  const response = await api.get(`/users/email/${email}`);
  return response.data;
};

export const getAllUsers = async (params) => {
  const response = await api.get('/users', { params });
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const getUserProfileImage = async (id) => {
  const response = await api.get(`/users/${id}/image`, { responseType: 'blob' });
  return response.data;
};

export const uploadProfileImage = async (id, file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post(`/users/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const generateUsersPdf = async () => {
  const response = await api.get('/users/report/pdf', { responseType: 'blob' });
  return response.data;
};


// New function to get current user profile using JWT
export const getUserProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};