import api from './api';

export const startChatThread = async (leadId) => {
  const response = await api.post('/messages/start', null, { params: { leadId } });
  return response.data;
};

export const sendMessage = async (threadId, data) => {
  const response = await api.post(`/messages/${threadId}`, data);
  return response.data;
};

export const getMessagesForThread = async (threadId, params = {}) => {
  const response = await api.get(`/messages/${threadId}`, { params });
  return response.data;
};

export const getMyChatThreads = async (params = {}) => {
  const response = await api.get('/messages/threads', { params });
  return response.data;
};

export const markMessagesAsRead = async (threadId) => {
  const response = await api.patch(`/messages/${threadId}/read`);
  return response.data;
};