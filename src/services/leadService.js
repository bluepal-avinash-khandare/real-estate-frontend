import api from './api';

export const getLeadsForAgent = async (agentId, params) => {
  const response = await api.get('/leads', { params: { agentId, ...params } });
  return response.data;
};

export const updateLeadStatus = async (id, newStatus) => {
  const response = await api.patch(`/leads/${id}/status`, null, { params: { newStatus } });
  return response.data;
};