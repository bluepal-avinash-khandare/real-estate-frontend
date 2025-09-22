import axios from 'axios';

// Hard-coded API base URL
const api = axios.create({
  baseURL: 'http://localhost:8088/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
