import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from './apiConfig';
import { tokenStorage } from '../storage/tokenStorage';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Bearer Token if present
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await tokenStorage.getAuthToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('[apiClient] Error attaching token to request:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Log errors or handle global response issues
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.warn('[apiClient] Request timed out');
    }
    return Promise.reject(error);
  }
);
