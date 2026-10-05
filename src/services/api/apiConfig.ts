/**
 * Backend API Configuration
 * 
 * Base URL configured for both Android and iOS:
 * http://192.168.100.10:5000
 */
// export const API_BASE_URL = 'http://192.168.100.10:5000';
export const API_BASE_URL = 'https://sign-in-sigup-backend.vercel.app';


export const API_ENDPOINTS = {
  SIGN_UP: '/api/auth/signup',
  SIGN_IN: '/api/auth/signin',
  PROFILE: '/api/auth/profile',
  LOGOUT: '/api/auth/logout',
} as const;

export const API_TIMEOUT = 15000; // 15 seconds
