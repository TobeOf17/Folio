// src/services/api.ts
import axios from 'axios';

// Configure axios to point to your Spring Boot backend
const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important: This sends cookies/session with requests
});

// Login function
export const login = async (identifier: string, password: string) => {
    try {
        const response = await api.post('/api/auth/login', {
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
