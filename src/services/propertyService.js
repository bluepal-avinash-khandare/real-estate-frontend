import api from './api';

export const createProperty = async (data, images) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  images.forEach((file) => formData.append('images', file));
  const response = await api.post('/properties', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const getProperty = async (id) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

export const getProperties = async (params) => {
  const response = await api.get('/properties', { params });
  return response.data;
};

export const updateProperty = async (id, data, images) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  images.forEach((file) => formData.append('images', file));
  const response = await api.put(`/properties/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
};

export const getMyProperties = async (userId) => {
  const response = await api.get(`/properties/my/${userId}`);
  return response.data;
};

export const getAgentProperties = async (agentId) => {
  const response = await api.get(`/properties/agent/${agentId}`);
  return response.data;
};