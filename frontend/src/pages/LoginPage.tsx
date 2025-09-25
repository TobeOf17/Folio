import React, { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import LoginIllustration from "../components/LoginIllustration.tsx";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const [error, setError] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await login({ email, password });
            navigate("/admin-dashboard");
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 h-11 bg-white border border-border text-gray-900 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Google
                                </button>
                                <button className="flex items-center justify-center gap-2 h-11 bg-white border border-border text-gray-900 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                                    </svg>
                                    Microsoft
                                </button>
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