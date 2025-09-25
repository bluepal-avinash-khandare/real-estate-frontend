import api from './api';



export const getUserByEmail = async (email) => {
  const response = await api.get(`/users/email/${email}`);
  return response.data;
};

export const getAllUsers = async (params) => {
  const response = await api.get('/users', { params });
  return response.data;
};


export const updateUser = async (id, data) => {
  // Validate id before making the request
  if (!id || id === 'undefined') {
    throw new Error('Invalid user ID');
  }
  
  // Only send fields that have values (partial update)
  const updateData = {};
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
      updateData[key] = data[key];
    }
  });
  
  // If no valid data to update, throw error
  if (Object.keys(updateData).length === 0) {
    throw new Error('No valid data to update');
  }
  
  const response = await api.put(`/users/${id}`, updateData);
  return response.data;
};

export const getUserById = async (id) => {
  // Validate id before making the request
  if (!id || id === 'undefined') {
    throw new Error('Invalid user ID');
  }
  
  const response = await api.get(`/users/${id}`);
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