// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StaffDashboard from '../components/dashboard/StaffDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import AttendanceStatusCard from '../components/dashboard/AttendanceStatusCard';
import { mockData } from '../utils/mockData';
import { getGreeting } from '../utils/helpers';

const Dashboard = () => {
    const { user, isAdmin } = useAuth();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [alerts, setAlerts] = useState([
        { id: 1, type: 'info', message: 'Shift change request approved for tomorrow', role: ['all'] },
        { id: 2, type: 'warning', message: 'Late arrival recorded yesterday', role: ['all'] }
    ]);

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
        return alerts.filter(alert => alert.role.includes('all') || alert.role.includes(user?.role?.name));
    };

    const dismissAlert = (alertId: number) => {
        setAlerts(alerts.filter(alert => alert.id !== alertId));
    };

    return (
        <div className="content-wrapper">
            {/* Welcome Header */}
            <div className="text-center mb-8">
                <h2 className="page-title mb-3">
                    {getGreeting()}, {user?.fullName?.split(' ')[0]}! 👋
                </h2>
                <p className="page-subtitle text-lg">
                    Folio - Staff Attendance Management System
                </p>
                <div className="text-sm text-purple-600 mt-2 font-mono">
                    {currentTime.toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })}
                </div>
            </div>

            {/* Alerts Section */}
            {getRelevantAlerts().length > 0 && (
                <div className="mb-6">
                    {getRelevantAlerts().map(alert => (
                        <div key={alert.id} className={`alert mb-3 ${
                            alert.type === 'warning' ? 'alert-warning' : 'alert-info'
                        }`}>
                            <div className="flex items-center">
                                <div className="mr-3">
                                    {alert.type === 'warning' ? '⚠️' : 'ℹ️'}
                                </div>
                                <div className="flex-1">{alert.message}</div>
                                <button
                                    className="btn btn-small btn-secondary ml-4"
                                    onClick={() => dismissAlert(alert.id)}
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Attendance Status Card */}
            <AttendanceStatusCard />

            {/* Role-specific Dashboard Content */}
            {getRoleSpecificContent()}
        </div>
    );
};

export default Dashboard;