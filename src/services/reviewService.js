// import api from './api';

// export const createReview = async (data, files) => {
//   const formData = new FormData();
//   formData.append('data', JSON.stringify(data));
//   files.forEach((file) => formData.append('files', file));
//   const response = await api.post('/reviews', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   });
//   return response.data;
// };

// export const updateReview = async (id, data, files) => {
//   const formData = new FormData();
//   formData.append('data', JSON.stringify(data));
//   files.forEach((file) => formData.append('files', file));
//   const response = await api.put(`/reviews/${id}`, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   });
//   return response.data;
// };

// export const getAllReviews = async (params) => {
//   const response = await api.get('/reviews', { params });
//   return response.data;
// };

// export const getReviewById = async (id) => {
//   const response = await api.get(`/reviews/${id}`);
//   return response.data;
// };

// export const deleteReview = async (id) => {
//   const response = await api.delete(`/reviews/${id}`);
//   return response.data;
// };

// export const getReviewsByProperty = async (propertyId, params) => {
//   const response = await api.get(`/reviews/property/${propertyId}`, { params });
//   return response.data;
// };

// export const getReviewsByUser = async (userId, params) => {
//   const response = await api.get(`/reviews/user/${userId}`, { params });
//   return response.data;
// };



import api from './api';

export const createReview = async (formData) => {
  try {
    const response = await api.post('/reviews', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.message || 'Failed to create review');
    } else if (error.request) {
      // Request made but no response received
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something happened in setting up the request
      throw new Error('An unexpected error occurred');
    }
  }
};

export const updateReview = async (id, data, files) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  files.forEach((file) => formData.append('files', file));
  const response = await api.put(`/reviews/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const getAllReviews = async (params) => {
  const response = await api.get('/reviews', { params });
  return response.data;
};

export const getReviewById = async (id) => {
  const response = await api.get(`/reviews/${id}`);
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await api.delete(`/reviews/${id}`);
  return response.data;
};

export const getReviewsByProperty = async (propertyId, params) => {
  const response = await api.get(`/reviews/property/${propertyId}`, { params });
  return response.data;
};

export const getReviewsByUser = async (userId, params) => {
  const response = await api.get(`/reviews/user/${userId}`, { params });
  return response.data;
};