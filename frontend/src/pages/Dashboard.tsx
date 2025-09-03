// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StaffDashboard from '../components/dashboard/StaffDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import AttendanceStatusCard from '../components/dashboard/AttendanceStatusCard';
import { getGreeting } from '../utils/helpers';

const Dashboard = () => {
    const { user, isAdmin } = useAuth();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [alerts, setAlerts] = useState<Array<{
        id: number;
        type: 'info' | 'warning' | 'success' | 'error';
        message: string;
        role: string[];
    }>>([]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getRoleSpecificContent = () => {
        if (isAdmin()) {
            return <AdminDashboard />;
        } else {
            return <StaffDashboard />;
        }
    };

    const getRelevantAlerts = () => {
        return alerts.filter(alert => alert.role.includes('all') || (user?.role?.name && alert.role.includes(user.role.name)));
    };

    const dismissAlert = (alertId: number) => {
        setAlerts(alerts.filter(alert => alert.id !== alertId));
    };

    return (
        <div className="dashboard-layout">
            {/* Welcome Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="welcome-section">
                        <h1 className="page-title">
                            {getGreeting()}, {user?.fullName?.split(' ')[0]}!
                        </h1>
                        <p className="page-subtitle">
                            Welcome to your attendance dashboard
                        </p>
                        <div className="time-info">
                            {currentTime.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })} • {currentTime.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                    <div className="time-display">
                        <div className="current-time">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                    </div>
                </div>
            </header>

            {/* Alerts Section */}
            {getRelevantAlerts().length > 0 && (
                <div className="mb-8">
                    {getRelevantAlerts().map(alert => (
                        <div key={alert.id} className={`alert mb-4 ${
                            alert.type === 'warning' ? 'alert-warning' : 'alert-info'
                        }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="mr-3">
                                        {alert.type === 'warning' ? '⚠️' : 'ℹ️'}
                                    </div>
                                    <div>{alert.message}</div>
                                </div>
                                <button
                                    className="btn btn-small btn-secondary"
                                    onClick={() => dismissAlert(alert.id)}
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Main Content Grid */}
            <div className="dashboard-grid">
                {/* Primary Content */}
                <div className="dashboard-primary">
                    {/* Attendance Status Card */}
                    <div className="card">
                        <AttendanceStatusCard />
                    </div>

                    {/* Role-specific Dashboard Content */}
                    <div className="card">
                        {getRoleSpecificContent()}
                    </div>
                </div>

                {/* Secondary Content */}
                <div className="dashboard-secondary">
                    {/* Quick Stats */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">This Month</h3>
                        </div>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-value">22</div>
                                <div className="stat-label">Present Days</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">176h</div>
                                <div className="stat-label">Total Hours</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">95%</div>
                                <div className="stat-label">On Time</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">3</div>
                                <div className="stat-label">Late Days</div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Schedule */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Upcoming</h3>
                        </div>
                        <div className="card-content">
                            <div className="empty-state">
                                <svg className="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9l2 2 4-4" />
                                </svg>
                                <p className="empty-state-text">No upcoming shifts scheduled</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;