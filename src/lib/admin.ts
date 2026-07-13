import { apiClient } from './api';

export const getAdminUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const updateUserStatus = async (id: string, status: string) => {
  const response = await apiClient.patch(`/users/${id}/status`, { status });
  return response.data;
};

export const getPlatformAnalytics = async () => {
  const response = await apiClient.get('/analytics/platform');
  return response.data;
};

export const updateItemStatus = async (id: string, status: string) => {
  const response = await apiClient.patch(`/items/${id}/status`, { status });
  return response.data;
};
