// src/pages/LoginPage.tsx (MODERN VERSION)
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login as loginAPI } from '../services/api';

const LoginPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const result = await loginAPI(identifier, password);
            login(result.staff);
        } catch (error: any) {
            if (error.response?.status === 401) {
                setError('Invalid username or password');
            } else if (error.code === 'ERR_NETWORK') {
                setError('Cannot connect to server. Please try again.');
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Sign in to your account</p>
                </div>

                <div className="login-form-card hover-lift">
                    <form className="form-container" onSubmit={handleSubmit}>
                        {error && (
                            <div className="form-error">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            </div>
                        )}

                        <div className="info-section">
                            <div className="form-group">
                                <label className="label">Username or Email</label>
                                <input
                                    type="text"
                                    required
                                    className="form-input"
                                    placeholder="Enter your username or email"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="form-input"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`btn btn-primary btn-large w-full ${isLoading ? 'btn-disabled' : ''}`}
                        >
                            <div className="flex items-center justify-center">
                                {isLoading && (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </div>
                        </button>
                    </form>

                    {/* Optional: Add a forgot password link */}
                    <div className="text-center mt-6">
                        <a href="#" className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-200">
                            Forgot your password?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;