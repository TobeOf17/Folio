// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login as loginAPI } from '../services/api';

interface LoginPageProps {
    onBackToLanding?: () => void;
}

const LoginPage = ({ onBackToLanding }: LoginPageProps) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const result = await loginAPI({ identifier, password });
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
        <div className="modern-login">
            {/* Background decoration */}
            <div className="login-background">
                <div className="bg-pattern"></div>
            </div>

            {/* Header with back navigation */}
            {onBackToLanding && (
                <header className="login-header">
                    <button onClick={onBackToLanding} className="back-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Back to Home</span>
                    </button>
                </header>
            )}

            {/* Main login content */}
            <main className="login-main">
                <div className="login-container">
                    {/* Brand section */}
                    <div className="login-brand-section">
                        <div className="brand-logo-large">
                            <span className="logo-icon">F</span>
                        </div>
                        <h1 className="login-main-title">Welcome back to Folio</h1>
                        <p className="login-subtitle">
                            Sign in to access your workforce management dashboard
                        </p>
                    </div>

                    {/* Login form */}
                    <div className="login-form-container">
                        <form className="login-form" onSubmit={handleSubmit}>
                            {/* Error message */}
                            {error && (
                                <div className="error-alert">
                                    <div className="error-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                                            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                    </div>
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Username/Email field */}
                            <div className="form-field">
                                <label className="field-label" htmlFor="identifier">
                                    Username or Email
                                </label>
                                <div className="input-wrapper">
                                    <input
                                        id="identifier"
                                        type="text"
                                        required
                                        className="form-input"
                                        placeholder="Enter your username or email"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Password field */}
                            <div className="form-field">
                                <label className="field-label" htmlFor="password">
                                    Password
                                </label>
                                <div className="input-wrapper password-wrapper">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="form-input"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me and forgot password */}
                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" className="checkbox-input" />
                                    <span className="checkbox-text">Remember me</span>
                                </label>
                                <a href="#" className="forgot-link">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`submit-button ${isLoading ? 'loading' : ''}`}
                            >
                                {isLoading ? (
                                    <div className="loading-content">
                                        <svg className="loading-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="32" strokeDashoffset="32">
                                                <animateTransform
                                                    attributeName="transform"
                                                    type="rotate"
                                                    values="0 12 12;360 12 12"
                                                    dur="1s"
                                                    repeatCount="indefinite"/>
                                                <animate
                                                    attributeName="stroke-dashoffset"
                                                    values="32;0;32"
                                                    dur="1s"
                                                    repeatCount="indefinite"/>
                                            </circle>
                                        </svg>
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <span>Sign In</span>
                                )}
                            </button>
                        </form>

                        {/* Additional help */}
                        <div className="login-help">
                            <p className="help-text">
                                Need help signing in?
                                <a href="#" className="help-link">Contact support</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;