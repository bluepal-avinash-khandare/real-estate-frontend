// // import api from './api';

// // export const requestAppointment = async (data) => {
// //   const response = await api.post('/appointments/request', data);
// //   return response.data;
// // };

// // export const getAppointmentsRequests = async (agentId, params) => {
// //   const response = await api.get('/appointments/requests', { params: { agentId, ...params } });
// //   return response.data;
// // };

// // export const handleAppointmentAction = async (id, action, data) => {
// //   const response = await api.post(`/appointments/${id}/action?action=${action}`, data);
// //   return response.data;
// // };

// // export const confirmAppointment = async (id) => {
// //   const response = await api.post(`/appointments/${id}/confirm`);
// //   return response.data;
// // };

// // export const generateAppointmentsReport = async (agentId) => {
// //   const response = await api.get('/appointments/report', { params: { agentId }, responseType: 'blob' });
// //   return response.data;
// // };

// // // ✅ ADD THIS FUNCTION
// // export const updateAppointmentStatus = async (appointmentId, status) => {
// //   const response = await api.put(`/appointments/${appointmentId}/status`, { status });
// //   return response.data;
// // };


// // src/services/appointmentService.js



import api from './api';

// ✅ POST: /appointments/request
export const requestAppointment = async (data) => {
  const response = await api.post('/appointments/request', data);
  return response.data;
};

// ✅ GET: /appointments/requests?agentId=...&search=...
export const getAppointmentsRequests = async (agentId, search = '') => {
  // Ensure agentId is a valid number
  const numericAgentId = typeof agentId === 'string' ? parseInt(agentId, 10) : agentId;
  
  if (isNaN(numericAgentId)) {
    throw new Error('Invalid agent ID');
  }
  
  console.log('Making request to /appointments/requests with params:', {
    agentId: numericAgentId,
    search
  });
  
  const response = await api.get('/appointments/requests', { 
    params: { 
      agentId: numericAgentId,
      search
    } 
  });
  
  console.log('Response received:', response);
  return response.data;
};

// ✅ POST: /appointments/{id}/action?action=approve/reject
export const handleAppointmentAction = async (id, action, data = {}) => {
  const response = await api.post(`/appointments/${id}/action`, data, {
    params: { action },
  });
  return response.data;
};

// ✅ POST: /appointments/{id}/confirm
export const confirmAppointment = async (id) => {
  const response = await api.post(`/appointments/${id}/confirm`);
  return response.data;
};

// ✅ GET: /appointments/report?agentId=...
export const generateAppointmentsReport = async (agentId) => {
  const response = await api.get('/appointments/report', {
    params: { agentId },
    responseType: 'blob',
  });
  return response.data;
};

// ✅ PUT: /appointments/{id}/status
export const updateAppointmentStatus = async (appointmentId, status) => {
  const response = await api.put(`/appointments/${appointmentId}/status`, { status });
  return response.data;
};

// ✅ GET: /api/appointments/customer/{customerId}
export const getCustomerAppointments = async (customerId, page = 0, size = 10, token) => {
  // Ensure customerId is a valid number
  const numericCustomerId = typeof customerId === 'string' ? parseInt(customerId, 10) : customerId;
  
  if (isNaN(numericCustomerId)) {
    throw new Error('Invalid customer ID');
  }
  
  console.log('Making request to /api/appointments/customer with params:', {
    customerId: numericCustomerId,
    page,
    size,
  });
  
  try {
    const response = await api.get(`/appointments/customer/${numericCustomerId}`, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Full response:', response);
    console.log('Response data:', response.data);
    console.log('Response data content:', response.data?.content);
    
    // Return the data directly since your backend returns Page<AppointmentResponseDto>
    return response.data;
  } catch (error) {
    console.error('Error fetching customer appointments:', error);
    console.error('Error response:', error.response);
    throw error;
  }
};