import api from './api';

export const requestAppointment = async (data) => {
  const response = await api.post('/appointments/request', data);
  return response.data;
};

export const getAppointmentsRequests = async (agentId, params) => {
  const response = await api.get('/appointments/requests', { params: { agentId, ...params } });
  return response.data;
};

export const handleAppointmentAction = async (id, action, data) => {
  const response = await api.post(`/appointments/${id}/action?action=${action}`, data);
  return response.data;
};

export const confirmAppointment = async (id) => {
  const response = await api.post(`/appointments/${id}/confirm`);
  return response.data;
};

export const generateAppointmentsReport = async (agentId) => {
  const response = await api.get('/appointments/report', { params: { agentId }, responseType: 'blob' });
  return response.data;
};