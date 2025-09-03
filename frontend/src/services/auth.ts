// src/services/auth.ts
// Authentication utilities and context types
import { Staff } from '../types';

// Auth context interface
export interface AuthContextType {
    isAuthenticated: boolean;
    user: Staff | null;
    login: (staff: Staff) => void;
    logout: () => void;
    isAdmin: () => boolean;
}

// Authentication utilities
export const isAdminRole = (roleName: string): boolean => {
    const adminRoles = ['Admin', 'Administrator', 'Super Admin', 'System Admin'];
    return adminRoles.includes(roleName);
};

export const hasPermission = (user: Staff | null, permission: string): boolean => {
    if (!user) return false;
    
    // For now, simple role-based permissions
    // This can be expanded to include specific permissions per role
    switch (permission) {
        case 'admin:read':
        case 'admin:write':
        case 'staff:manage':
        case 'reports:view':
            return isAdminRole(user.role.name);
        case 'attendance:own':
        case 'profile:edit':
            return true; // All authenticated users can manage their own data
        default:
            return false;
    }
};

export const getStoredUser = (): Staff | null => {
    try {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error('Error parsing stored user:', error);
        return null;
    }
};

export const storeUser = (user: Staff): void => {
    try {
        localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        console.error('Error storing user:', error);
    }
};

export const clearStoredUser = (): void => {
    try {
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Error clearing stored user:', error);
    }
};
