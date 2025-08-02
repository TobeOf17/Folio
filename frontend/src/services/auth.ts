// src/services/auth.ts
const API_BASE_URL = 'http://localhost:8080/api';

export interface LoginRequest {
    identifier: string; // email or employee ID
    password: string;
}

export interface Staff {
    staffId: number;
    fullName: string;
    email: string;
    employeeId: string;
    role: {
        name: string;
        roleId: number;
    };
    // Add other staff properties as needed
}

export interface LoginResponse {
    message: string;
    staff: Staff;
}

export interface ApiError {
    message: string;
}

class AuthService {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important for session cookies
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    }

    async logout(): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }
    }

    async changePassword(currentPassword: string, newPassword: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Password change failed');
        }
    }
}

export const authService = new AuthService();