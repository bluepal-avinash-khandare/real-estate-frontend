import axios from 'axios';

// Hard-coded API base URL
const api = axios.create({
  baseURL: 'http://localhost:8088/api',
  timeout: 10000,
  withCredentials: true, // Important for CORS
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log the request details
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    // Log the response details
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    // Enhanced error logging
    if (error.response) {
      console.error('Error response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    }
    
    // Handle CORS errors specifically
    if (error.message === 'Network Error' && !error.response) {
      console.error('CORS or network error detected');
    }
    
    return Promise.reject(error);
  }
);

export default api;