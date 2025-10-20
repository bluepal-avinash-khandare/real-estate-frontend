// // import api from './api';

// // export const createReview = async (data, files) => {
// //   const formData = new FormData();
// //   formData.append('data', JSON.stringify(data));
// //   files.forEach((file) => formData.append('files', file));
// //   const response = await api.post('/reviews', formData, {
// //     headers: { 'Content-Type': 'multipart/form-data' }
// //   });
// //   return response.data;
// // };

// // export const updateReview = async (id, data, files) => {
// //   const formData = new FormData();
// //   formData.append('data', JSON.stringify(data));
// //   files.forEach((file) => formData.append('files', file));
// //   const response = await api.put(`/reviews/${id}`, formData, {
// //     headers: { 'Content-Type': 'multipart/form-data' }
// //   });
// //   return response.data;
// // };

// // export const getAllReviews = async (params) => {
// //   const response = await api.get('/reviews', { params });
// //   return response.data;
// // };

// // export const getReviewById = async (id) => {
// //   const response = await api.get(`/reviews/${id}`);
// //   return response.data;
// // };

// // export const deleteReview = async (id) => {
// //   const response = await api.delete(`/reviews/${id}`);
// //   return response.data;
// // };

// // export const getReviewsByProperty = async (propertyId, params) => {
// //   const response = await api.get(`/reviews/property/${propertyId}`, { params });
// //   return response.data;
// // };

// // export const getReviewsByUser = async (userId, params) => {
// //   const response = await api.get(`/reviews/user/${userId}`, { params });
// //   return response.data;
// // };



// import api from './api';

// export const createReview = async (formData) => {
//   try {
//     const response = await api.post('/reviews', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       // Server responded with error status
//       throw new Error(error.response.data.message || 'Failed to create review');
//     } else if (error.request) {
//       // Request made but no response received
//       throw new Error('Network error. Please check your connection.');
//     } else {
//       // Something happened in setting up the request
//       throw new Error('An unexpected error occurred');
//     }
//   }
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

// c k pandey


import api from './api';

export const createReview = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    console.log('Creating review with formData:', formData);
    
    const response = await api.post('/reviews', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
      
      if (error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else if (error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(err => err.message || err).join(', ');
        throw new Error(errorMessages);
      } else {
        throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};



export const updateReview = async (id, data, files) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (files && files.length > 0) {
      files.forEach((file) => formData.append('files', file));
    }
    
    const response = await api.put(`/reviews/${id}`, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to update review');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getAllReviews = async (params = {}) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/reviews', { 
      params,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch reviews');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getReviewById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get(`/reviews/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch review');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const deleteReview = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/reviews/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to delete review');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getReviewsByProperty = async (propertyId, params = {}) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get(`/reviews/property/${propertyId}`, { 
      params,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch property reviews');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getReviewsByUser = async (userId, params = {}) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get(`/reviews/user/${userId}`, { 
      params,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch user reviews');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};