// src/services/auth.ts - Super Simple Version
import { api } from "./api";

export type LoginInput = {
    email: string;
    password: string;
};

export type SignupInput = {
    name: string;
    email: string;
    password: string;
};

export type Staff = {
    id: number;
    name: string;
    role: string;
};

// Simple login - just call backend and return response
export async function login(credentials: LoginInput) {
    const { data } = await api.post("/api/auth/login", {
        identifier: credentials.email,
        password: credentials.password,
    });
    return data;
}

// Simple signup - just call backend
export async function signup(userData: SignupInput) {
    const { data } = await api.post("/api/auth/signup", userData);
    return data;
}

// Simple logout
export async function logout() {
    await api.post("/api/auth/logout");
}

// Get current user (for checking if logged in)
export async function getCurrentUser(): Promise<Staff | null> {
    try {
        const { data } = await api.get("/api/auth/me");
        return data.staff;
    } catch {
        return null;
    }
}

// Quick auth check
export async function isLoggedIn(): Promise<boolean> {
    const user = await getCurrentUser();
    return user !== null;
}