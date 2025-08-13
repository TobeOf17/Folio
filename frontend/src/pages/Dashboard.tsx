// src/pages/Dashboard.tsx (CLEAN VERSION)
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, isAdmin } = useAuth();

    return (
        <div className="content-wrapper">
            <div className="text-center">
                <h2 className="page-title">Welcome Back!</h2>
                <p className="page-subtitle">Here's your account overview</p>
            </div>

            <div className="card">
                <h3 className="card-header">Your Information</h3>

                <div className="info-grid">
                    <div className="info-section">
                        <div className="form-group">
                            <label className="label">Staff ID</label>
                            <p className="info-text">{user?.staffId}</p>
                        </div>
                        <div className="form-group">
                            <label className="label">Full Name</label>
                            <p className="info-text">{user?.fullName}</p>
                        </div>
                    </div>

                    <div className="info-section">
                        <div className="form-group">
                            <label className="label">Role</label>
                            <p className="info-text">{user?.role?.name}</p>
                        </div>
                        <div className="form-group">
                            <label className="label">Admin Access</label>
                            <p className={`info-text ${isAdmin() ? 'text-purple-700 bg-purple-100' : ''}`}>
                                {isAdmin() ? 'Yes' : 'No'}
                            </p>
                        </div>
                    </div>
                </div>

                {isAdmin() && (
                    <div className="admin-badge mt-6">
                        <div className="admin-badge-content">
                            <div className="admin-badge-icon">🔐</div>
                            <div>
                                <h4 className="admin-badge-title">Admin Privileges Detected</h4>
                                <p className="admin-badge-description">
                                    You have access to the Admin Panel for system management.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;