// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Staff, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<Staff | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (staff: Staff) => {
        setUser(staff);
        setIsAuthenticated(true);
        console.log('User logged in:', staff);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        console.log('User logged out');
    };

    const isAdmin = () => {
        return user?.role?.name?.toLowerCase().includes('admin') || false;
    };

    const value: AuthContextType = {
        isAuthenticated,
        user,
        login,
        logout,
        isAdmin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};