// src/components/dashboard/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';

interface SystemStats {
    totalStaff: number;
    presentToday: number;
    onLeave: number;
    lateToday: number;
    pendingRequests: number;
}

interface RecentActivity {
    id: number;
    staffName: string;
    action: string;
    timestamp: string;
    type: 'check-in' | 'check-out' | 'leave-request' | 'shift-request';
}

interface Department {
    id: number;
    name: string;
    totalStaff: number;
    presentToday: number;
}

const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        // Simulate loading - replace with actual API calls
        const loadData = async () => {
            setIsLoading(true);
            // TODO: Replace with actual API calls to fetch:
            // - System statistics
            // - Recent activity
            // - Department data
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsLoading(false);
        };
        loadData();
    }, []);

    const handleNavigation = (page: string) => {
        // TODO: Implement navigation to specific admin pages
        console.log(`Navigate to: ${page}`);
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="card">
                    <div className="loading-container">
                        <div className="loading-text">Loading admin dashboard...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Admin Badge */}
            <div className="admin-badge hover-lift">
                <div className="admin-badge-content">
                    <div className="admin-badge-icon bg-gradient-to-br from-red-500 to-red-600 text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4">
                        👑
                    </div>
                    <div className="flex-1">
                        <h4 className="admin-badge-title text-lg font-semibold mb-1">Admin Dashboard</h4>
                        <p className="admin-badge-description">
                            System overview and management tools for attendance and staff administration.
                        </p>
                    </div>
                </div>
            </div>

            {/* System Stats */}
            <div className="card hover-lift">
                <h3 className="card-header flex items-center">
                    📊 System Overview
                </h3>
                {stats ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="stat-card stat-card-blue hover-lift">
                            <div className="stat-number stat-number-blue">{stats.totalStaff}</div>
                            <div className="stat-label stat-label-blue">Total Staff</div>
                        </div>
                        <div className="stat-card stat-card-green hover-lift">
                            <div className="stat-number stat-number-green">{stats.presentToday}</div>
                            <div className="stat-label stat-label-green">Present Today</div>
                        </div>
                        <div className="stat-card stat-card-red hover-lift">
                            <div className="stat-number stat-number-red">{stats.onLeave}</div>
                            <div className="stat-label stat-label-red">On Leave</div>
                        </div>
                        <div className="stat-card bg-orange-50 hover-lift">
                            <div className="stat-number text-orange-600">{stats.lateToday}</div>
                            <div className="stat-label text-orange-800">Late Today</div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-gray-500 mb-4">📊</div>
                        <div className="text-gray-600">No system data available</div>
                        <div className="text-sm text-gray-500">Data will load when staff information is available</div>
                    </div>
                )}
            </div>

            {/* Admin Actions */}
            <div className="info-grid">
                <div className="card hover-lift">
                    <h4 className="card-header">👥 Staff Management</h4>
                    <div className="space-y-3">
                        <button
                            onClick={() => handleNavigation('staff-management')}
                            className="btn btn-primary w-full"
                        >
                            👥 Manage Staff
                        </button>
                        <button
                            onClick={() => handleNavigation('attendance-reports')}
                            className="btn btn-secondary w-full"
                        >
                            📊 Attendance Reports
                        </button>
                        <button
                            onClick={() => handleNavigation('leave-requests')}
                            className="btn btn-secondary w-full"
                        >
                            🏥 Leave Requests
                        </button>
                        <button
                            onClick={() => handleNavigation('add-staff')}
                            className="btn btn-secondary w-full"
                        >
                            ➕ Add New Staff
                        </button>
                    </div>
                </div>

                <div className="card hover-lift">
                    <h4 className="card-header">⚙️ System Administration</h4>
                    <div className="space-y-3">
                        <button
                            onClick={() => handleNavigation('shift-management')}
                            className="btn btn-primary w-full"
                        >
                            🔄 Shift Management
                        </button>
                        <button
                            onClick={() => handleNavigation('analytics')}
                            className="btn btn-secondary w-full"
                        >
                            📈 Analytics Dashboard
                        </button>
                        <button
                            onClick={() => handleNavigation('schedule-management')}
                            className="btn btn-secondary w-full"
                        >
                            📅 Schedule Management
                        </button>
                        <button
                            onClick={() => handleNavigation('settings')}
                            className="btn btn-secondary w-full"
                        >
                            ⚙️ System Settings
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="card hover-lift">
                <h4 className="card-header flex items-center">
                    🕐 Recent Activity
                </h4>
                {recentActivity.length > 0 ? (
                    <div className="space-y-3">
                        {recentActivity.map((activity) => {
                            const colorClass = activity.type === 'check-in'
                                ? 'bg-green-50 border-green-200'
                                : activity.type === 'check-out'
                                    ? 'bg-blue-50 border-blue-200'
                                    : activity.type === 'leave-request'
                                        ? 'bg-yellow-50 border-yellow-200'
                                        : 'bg-purple-50 border-purple-200';

                            const textClass = activity.type === 'check-in'
                                ? 'text-green-800'
                                : activity.type === 'check-out'
                                    ? 'text-blue-800'
                                    : activity.type === 'leave-request'
                                        ? 'text-yellow-800'
                                        : 'text-purple-800';

                            const timeClass = activity.type === 'check-in'
                                ? 'text-green-600'
                                : activity.type === 'check-out'
                                    ? 'text-blue-600'
                                    : activity.type === 'leave-request'
                                        ? 'text-yellow-600'
                                        : 'text-purple-600';

                            return (
                                <div key={activity.id} className={`p-3 rounded-lg border ${colorClass}`}>
                                    <div className={`text-sm ${textClass}`}>
                                        <strong>{activity.staffName}</strong> {activity.action}
                                    </div>
                                    <div className={`text-xs ${timeClass}`}>{activity.timestamp}</div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-gray-500 mb-4">🕐</div>
                        <div className="text-gray-600">No recent activity</div>
                        <div className="text-sm text-gray-500">Staff activity will appear here</div>
                    </div>
                )}
            </div>

            {/* Department Overview */}
            <div className="card hover-lift">
                <h4 className="card-header flex items-center">
                    🏢 Department Overview
                </h4>
                {departments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {departments.map((dept, index) => {
                            const colors = ['blue', 'green', 'red', 'orange', 'pink', 'indigo'];
                            const color = colors[index % colors.length];
                            const attendanceRate = dept.totalStaff > 0 ? (dept.presentToday / dept.totalStaff) * 100 : 0;

                            return (
                                <div key={dept.id} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-200`}>
                                    <div className={`font-semibold text-${color}-900 mb-2`}>{dept.name}</div>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-${color}-700 text-sm`}>Present Today</span>
                                        <span className={`font-bold text-${color}-800`}>{dept.presentToday}/{dept.totalStaff}</span>
                                    </div>
                                    <div className="mt-2">
                                        <div className={`w-full bg-${color}-200 rounded-full h-2`}>
                                            <div
                                                className={`bg-${color}-600 h-2 rounded-full transition-all duration-300`}
                                                style={{ width: `${attendanceRate}%` }}
                                            ></div>
                                        </div>
                                        <div className={`text-xs text-${color}-600 mt-1`}>
                                            {attendanceRate.toFixed(1)}% present
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-gray-500 mb-4">🏢</div>
                        <div className="text-gray-600">No departments configured</div>
                        <div className="text-sm text-gray-500">Add departments to see overview data</div>
                        <button
                            onClick={() => handleNavigation('department-setup')}
                            className="btn btn-primary mt-4"
                        >
                            ➕ Add Departments
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;