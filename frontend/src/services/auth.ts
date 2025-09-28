// src/services/auth.ts
import { Staff } from '../types';

const API_BASE = 'http://localhost:8080/api'; 

export interface SignupData {
  companyName: string;
  companyEmail: string;
  companyIndustry?: string;
  name: string; // Admin name
  email: string; // Admin email
  password: string; // Admin password
}

export interface LoginData {
  identifier: string; // Email or employee ID
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: Staff | null;
  login: (staff: Staff) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

class AuthService {
  // Signup new company with admin
  async signup(data: SignupData): Promise<any> {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for session cookies
      body: JSON.stringify({
        companyName: data.companyName,
        companyEmail: data.companyEmail,
        companyIndustry: data.companyIndustry || 'General',
        adminName: data.name,
        adminEmail: data.email,
        adminPassword: data.password
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Signup failed');
    }

    return result;
  }

  // Login existing user
  async login(data: LoginData): Promise<Staff> {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for session cookies
      body: JSON.stringify({
        identifier: data.identifier,
        password: data.password
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }

    return result.staff;
  }

  // Logout user
  async logout(): Promise<void> {
    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  }

  // Get current user info
  async getCurrentUser(): Promise<Staff | null> {
    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        credentials: 'include',
      });

      if (response.status === 401) {
        return null; // Not authenticated
      }

      if (!response.ok) {
        throw new Error('Failed to get current user');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Get user profile
  async getProfile(): Promise<Staff> {
    const response = await fetch(`${API_BASE}/staff/me`, {
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to get profile');
    }

    return result;
  }
}

// Create and export singleton instance
const authService = new AuthService();

export default authService;

// Export individual functions for backward compatibility
export const signup = (data: SignupData) => authService.signup(data);
export const login = (data: LoginData) => authService.login(data);
export const logout = () => authService.logout();
export const getCurrentUser = () => authService.getCurrentUser();
export const getProfile = () => authService.getProfile();