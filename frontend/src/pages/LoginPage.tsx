import React, { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import LoginIllustration from "../components/LoginIllustration.tsx";
import { authService } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();

    const navigate = useNavigate();
    const [error, setError] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const response = await authService.login({ identifier, password });
            login(response.staff); // Set user in context
            navigate("/dashboard"); // Navigate after successful login
        } catch (err: any) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* NAVBAR */}
            <Navbar variant="landing" />

            {/* LOGIN SECTION */}
            <section className="min-h-[calc(100vh-80px)] py-10 bg-background-gray flex items-center">
                <div className="max-w-6xl mx-auto px-6 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px]">
                        
                        {/* Auth Card */}
                        <div className="bg-white border border-border rounded-2xl p-10 shadow-large max-w-lg mx-auto lg:mx-0 w-full">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-3 mb-4">
                                </div>
                                <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome back</h1>
                                <p className="text-text-secondary">Sign in to your account to continue</p>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                                    {error}
                                </div>
                            )}

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full h-12 border border-border rounded-xl px-4 text-base bg-white focus:border-brand focus:ring-4 focus:ring-brand/25 outline-none transition-all"
                                        placeholder="Enter your email"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full h-12 border border-border rounded-xl px-4 text-base bg-white focus:border-brand focus:ring-4 focus:ring-brand/25 outline-none transition-all"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex justify-between items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 border-2 border-border rounded bg-white checked:bg-brand checked:border-brand focus:ring-2 focus:ring-brand/25"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <span className="text-gray-900">Remember me</span>
                                    </label>
                                    <a href="/forgot-password" className="text-sm font-medium text-brand hover:text-brand-hover transition-colors">
                                        Forgot password?
                                    </a>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full h-12 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover active:translate-y-px transition-all shadow-sm mt-2"
                                >
                                    Sign in
                                </button>
                            </form>

                            <div className="relative my-6 text-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border"></div>
                                </div>
                                <span className="relative bg-white px-4 text-sm text-text-secondary">
                                    or continue with
                                </span>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-sm text-text-secondary">
                                    Don't have an account?{" "}
                                    <a href="/signup" className="font-semibold text-brand hover:text-brand-hover transition-colors">
                                        Create one
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Illustration Side */}
                        <div className="hidden lg:block py-10">
                            <LoginIllustration />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;