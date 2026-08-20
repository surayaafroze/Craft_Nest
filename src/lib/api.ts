import axios from 'axios';

const API_BASE_URL = typeof window !== 'undefined' ? '/api/backend' : (process.env.NEXT_PUBLIC_SERVER_URL ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api` : 'http://localhost:5000/api');

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Authorization Bearer token from localStorage
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor to handle unauthorized errors and auto-sync
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('user_info');
        if (cached) {
          try {
            const u = JSON.parse(cached);
            if (u && u.email) {
              const syncRes = await axios.post(`${API_BASE_URL}/auth/sync`, {
                email: u.email,
                name: u.name,
                avatarUrl: u.avatarUrl || u.image,
                role: u.role,
              });
              if (syncRes.data?.token) {
                localStorage.setItem('auth_token', syncRes.data.token);
                originalRequest.headers.Authorization = `Bearer ${syncRes.data.token}`;
                return apiClient(originalRequest);
              }
            }
          } catch (syncErr) {}
        }
      }
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
