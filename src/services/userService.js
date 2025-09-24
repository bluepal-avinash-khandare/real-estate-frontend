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

export const getUserProfileImage = async () => {
  try {
    const response = await api.get('/users/image', { responseType: 'text' });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile image:', error.response?.data || error.message);
    throw error;
  }
};

export const uploadProfileImage = async (file) => {
  try {
    if (!file || !(file instanceof File)) {
      console.error('Invalid file provided:', file);
      throw new Error('No valid file provided for upload');
    }
    console.log('Uploading file:', { name: file.name, size: file.size, type: file.type });
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/users/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('Upload response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error.response?.data || error.message);
    throw error;
  }
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