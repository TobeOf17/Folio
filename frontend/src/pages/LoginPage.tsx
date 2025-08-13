// src/pages/LoginPage.tsx (CLEAN VERSION)
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

                <div className="login-form-card">
                    <form className="form-container" onSubmit={handleSubmit}>
                        {error && <div className="form-error">{error}</div>}

                        <div className="info-section">
                            <div className="form-group">
                                <label className="label">Username or Email</label>
                                <input
                                    type="text"
                                    required
                                    className="form-input"
                                    placeholder="Enter your username"
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
                            className={`btn-primary btn-large w-full ${isLoading ? 'btn-disabled' : ''}`}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;