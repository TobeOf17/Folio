// src/services/api.ts (UPDATED - Add admin endpoints)
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Login function (existing)
export const login = async (identifier: string, password: string) => {
    try {
        const response = await api.post('/auth/login', {
            identifier,
            password
        });

        console.log('Login successful:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error;
    }
};

// NEW: Admin API calls
export const getDashboardStats = async () => {
    try {
        const response = await api.get('/admin/dashboard');
        console.log('Dashboard stats:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to get dashboard stats:', error.response?.data || error.message);
        throw error;
    }
};

export const getAllRoles = async () => {
    try {
        const response = await api.get('/admin/roles');
        console.log('Roles:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to get roles:', error.response?.data || error.message);
        throw error;
    }
};