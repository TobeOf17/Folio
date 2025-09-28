import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Staff } from '../types';
import { authService } from '../services/auth';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: Staff | null;
  login: (staff: Staff) => void;
  logout: () => void;
  isAdmin: () => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<Staff | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in on app start
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await authService.getCurrentUser();
            if (response) {
                setUser(response);
                setIsAuthenticated(true);
            }
        } catch (error) {
            // User not authenticated, that's fine
        } finally {
            setLoading(false);
        }
    };

    const login = (staff: Staff) => {
        setUser(staff);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const isAdmin = () => {
        return user?.admin === true;
    };

    const value: AuthContextType = {
        isAuthenticated,
        user,
        login,
        logout,
        isAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};