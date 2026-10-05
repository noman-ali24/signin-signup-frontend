import { apiClient } from './apiClient';
import { API_BASE_URL, API_ENDPOINTS } from './apiConfig';
import { tokenStorage } from '../storage/tokenStorage';

export interface BackendUser {
  id: string;
  fullName: string;
  email: string;
  [key: string]: any;
}

export interface NormalizedAuthResponse {
  token: string;
  user: BackendUser;
  message?: string;
}

export interface ProfileApiResponse {
  success?: boolean;
  message?: string;
  data?: {
    user: BackendUser;
  };
  user?: BackendUser;
}

export interface SignUpPayload {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  phone?: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

/**
 * Extracts a clean, human-readable error message from Axios errors or backend responses.
 */
export const extractErrorMessage = (error: any): string => {
  if (!error) return 'An unexpected error occurred.';

  // Check if response received from server
  if (error.response?.data) {
    const data = error.response.data;

    // Direct message string
    if (typeof data.message === 'string' && data.message.trim().length > 0) {
      return data.message;
    }

    // Direct error string
    if (typeof data.error === 'string' && data.error.trim().length > 0) {
      return data.error;
    }

    // Validation errors array (e.g., express-validator)
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors
        .map((e: any) => (typeof e === 'string' ? e : e.msg || e.message || JSON.stringify(e)))
        .join('\n');
    }
  }

  // Network / connection errors
  if (error.message === 'Network Error') {
    return `Cannot connect to server at ${API_BASE_URL}.\nPlease make sure your backend server is running.`;
  }

  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return 'The request timed out. Please check your network connection and server status.';
  }

  return error.message || 'Something went wrong. Please try again.';
};

export const authService = {
  /**
   * Register a new user and return normalized token & user
   */
  async signUp(payload: SignUpPayload): Promise<NormalizedAuthResponse> {
    const phoneVal = payload.phoneNumber || payload.phone || '';
    const requestData = {
      ...payload,
      phone: phoneVal,
      phoneNumber: phoneVal,
    };

    console.log('🚀 [AUTH API] POST /api/auth/signup - Sending Payload:', {
      fullName: payload.fullName,
      email: payload.email,
      phone: phoneVal,
    });

    const response = await apiClient.post(API_ENDPOINTS.SIGN_UP, requestData);
    const body = response.data;
    console.log('✅ [AUTH API] POST /api/auth/signup - Server Response:', body);

    // Robust extraction: supports both { data: { token, user } } and direct { token, user }
    const token =
      body?.data?.token ||
      body?.token ||
      body?.accessToken ||
      body?.data?.accessToken;

    const rawUser = body?.data?.user || body?.user;

    const user: BackendUser = {
      id: rawUser?._id || rawUser?.id || body?.data?.id || body?.id || 'usr_' + Date.now(),
      fullName:
        rawUser?.fullName ||
        rawUser?.name ||
        body?.data?.fullName ||
        body?.fullName ||
        payload.fullName,
      email:
        rawUser?.email ||
        body?.data?.email ||
        body?.email ||
        payload.email,
    };

    if (!token) {
      const msg = body?.message || body?.error || 'Token not received from backend server.';
      throw new Error(msg);
    }

    return {
      token,
      user,
      message: body?.message,
    };
  },

  /**
   * Login an existing user and return normalized token & user
   */
  async signIn(payload: SignInPayload): Promise<NormalizedAuthResponse> {
    console.log('🚀 [AUTH API] POST /api/auth/signin - Sending Payload:', {
      email: payload.email,
    });

    const response = await apiClient.post(API_ENDPOINTS.SIGN_IN, payload);
    const body = response.data;
    console.log('✅ [AUTH API] POST /api/auth/signin - Server Response:', body);

    // Robust extraction: supports both { data: { token, user } } and direct { token, user }
    const token =
      body?.data?.token ||
      body?.token ||
      body?.accessToken ||
      body?.data?.accessToken;

    const rawUser = body?.data?.user || body?.user;

    const user: BackendUser = {
      id: rawUser?._id || rawUser?.id || body?.data?.id || body?.id || 'usr_' + Date.now(),
      fullName:
        rawUser?.fullName ||
        rawUser?.name ||
        body?.data?.fullName ||
        body?.fullName ||
        'User',
      email:
        rawUser?.email ||
        body?.data?.email ||
        body?.email ||
        payload.email,
    };

    if (!token) {
      const msg = body?.message || body?.error || 'Token not received from backend server.';
      throw new Error(msg);
    }

    return {
      token,
      user,
      message: body?.message,
    };
  },

  /**
   * Fetch authenticated user's profile (Protected route)
   */
  async getProfile(): Promise<ProfileApiResponse> {
    const response = await apiClient.get<ProfileApiResponse>(
      API_ENDPOINTS.PROFILE
    );
    return response.data;
  },

  /**
   * Log out current user from backend
   */
  async logout(token?: string): Promise<{ success: boolean; message: string }> {
    try {
      const authToken = token || (await tokenStorage.getToken());
      console.log('🚀 [AUTH API] POST /api/auth/logout - Informing backend...');

      const response = await apiClient.post(
        API_ENDPOINTS.LOGOUT,
        {},
        authToken
          ? {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          : undefined
      );

      console.log('✅ [AUTH API] POST /api/auth/logout - Server Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.warn('Backend logout warning:', error?.response?.data || error.message);
      // Even if backend fails, client-side logout should proceed
      return { success: false, message: error?.message || 'Logout failed on server' };
    }
  },
};
