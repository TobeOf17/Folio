import api from '../api/client';
import { Staff } from '../types';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: Staff | null;
  login: (staff: Staff) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface SignupRequest {
  companyName: string;
  industry: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
}

export const authService = {
  async login(credentials: LoginRequest) {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async signup(signupData: SignupRequest) {
    const response = await api.post('/auth/signup', signupData);
    return response.data;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },
};