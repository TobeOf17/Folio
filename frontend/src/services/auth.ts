// src/services/auth.ts
import { api } from "./api";

// Backend expects identifier + password
export type LoginInput = { email: string; password: string };

// Optional: if your backend has /signup endpoint
export type SignupInput = { name: string; email: string; password: string };

export async function login({ email, password }: LoginInput) {
    // Map email -> identifier to match AuthController.LoginRequest
    const { data } = await api.post("/api/auth/login", {
        identifier: email,
        password,
    });
    // Backend sets JSESSIONID cookie automatically
    return data; // includes { message, staff }
}

export async function logout() {
    await api.post("/api/auth/logout");
}

export async function signup(input: SignupInput) {
    // Only call if backend implements /api/auth/signup
    await api.post("/api/auth/signup", input);
}

// Client-side helper — truth is on server, but this can help toggle UI
export function isAuthenticated(): boolean {
    return document.cookie.includes("JSESSIONID=");
}
