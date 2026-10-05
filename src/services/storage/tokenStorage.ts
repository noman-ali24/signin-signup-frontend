import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../../redux/slices/authSlice';

const STORAGE_KEYS = {
  TOKEN: '@autopulse_auth_token',
  USER: '@autopulse_auth_user',
} as const;

export const tokenStorage = {
  /**
   * Save JWT token and user profile into AsyncStorage
   */
  async saveAuthData(token: string, user: UserProfile): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
      ]);
    } catch (error) {
      console.error('[tokenStorage] Error saving auth data:', error);
    }
  },

  /**
   * Get stored JWT token
   */
  async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('[tokenStorage] Error getting token:', error);
      return null;
    }
  },

  /**
   * Get stored user profile
   */
  async getStoredUser(): Promise<UserProfile | null> {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (!userJson) return null;
      return JSON.parse(userJson) as UserProfile;
    } catch (error) {
      console.error('[tokenStorage] Error getting stored user:', error);
      return null;
    }
  },

  /**
   * Remove stored token and user profile (logout)
   */
  async clearAuthData(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
      ]);
    } catch (error) {
      console.error('[tokenStorage] Error clearing auth data:', error);
    }
  },

  /**
   * Aliases for convenience
   */
  async getToken(): Promise<string | null> {
    return this.getAuthToken();
  },

  async clearToken(): Promise<void> {
    return this.clearAuthData();
  },

  async removeToken(): Promise<void> {
    return this.clearAuthData();
  },
};
