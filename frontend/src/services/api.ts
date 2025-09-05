// src/services/api.ts
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
    withCredentials: true, // send/receive JSESSIONID cookie
    timeout: 15000,
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        const msg =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "Request failed";
        return Promise.reject(new Error(msg));
    }
);
