import axios from 'axios';

const API_BASE_URL = typeof window !== 'undefined' ? '/api/backend' : (process.env.NEXT_PUBLIC_SERVER_URL ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api` : 'http://localhost:5000/api');

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle unauthorized errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // You can trigger a global logout event or redirect to login
      console.warn('Unauthorized access - potentially expired session');
    }
    return Promise.reject(error);
  }
);

export const handleApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error || error.response?.data?.message || error.message;
  }
  return error instanceof Error ? error.message : 'An unexpected error occurred';
};
