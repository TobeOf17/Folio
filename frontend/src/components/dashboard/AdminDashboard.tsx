// src/components/dashboard/AdminDashboard.tsx
import React, { useState } from 'react';

interface StaffMember {
    id: number;
    name: string;
    department: string;
    status: 'present' | 'absent' | 'late' | 'on-leave';
    checkInTime?: string;
}

interface DepartmentStats {
    name: string;
    totalStaff: number;
    presentToday: number;
}

const AdminDashboard = () => {
    // Mock data - in real app, this would come from API
    const [stats] = useState({
        totalStaff: 45,
        presentToday: 38,
        onLeave: 7,
        lateToday: 3
    });

    const [recentActivity] = useState([
        { id: 1, name: 'John Doe', action: 'checked in at 8:30 AM', timeAgo: '2 minutes ago', type: 'checkin' },
        { id: 2, name: 'Jane Smith', action: 'requested shift change', timeAgo: '15 minutes ago', type: 'request' },
        { id: 3, name: 'Mike Johnson', action: 'submitted leave request', timeAgo: '1 hour ago', type: 'leave' }
    ]);

    const [departments] = useState<DepartmentStats[]>([
        { name: 'IT Department', totalStaff: 5, presentToday: 4 },
        { name: 'HR Department', totalStaff: 8, presentToday: 7 },
        { name: 'Finance', totalStaff: 6, presentToday: 6 },
        { name: 'Operations', totalStaff: 12, presentToday: 10 },
        { name: 'Marketing', totalStaff: 8, presentToday: 7 },
        { name: 'Sales', totalStaff: 6, presentToday: 4 }
    ]);

    const handleAction = (action: string) => {
        console.log(`Admin action: ${action}`);
        // In real app, this would trigger navigation or modal
    };

    return (
        <div className="space-y-6">
            {/* Admin Badge */}
            <div className="admin-badge hover-lift">
                <div className="admin-badge-content">
                    <div className="admin-badge-icon bg-gradient-to-br from-purple-500 to-purple-600 text-white w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4">
                        👑
                    </div>
                    <div className="flex-1">
                        <h4 className="admin-badge-title text-lg font-semibold mb-1">Admin Access Active</h4>
                        <p className="admin-badge-description">
                            Full system access for staff management, attendance monitoring, and system administration.
                        </p>
                    </div>
                </div>
            </div>

            {/* Admin Stats */}
            <div className="card hover-lift">
                <h3 className="card-header flex items-center">
                    📊 System Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="stat-card stat-card-blue hover-lift">
                        <div className="stat-number stat-number-blue">{stats.totalStaff}</div>
                        <div className="stat-label stat-label-blue">Total Staff</div>
                    </div>
                    <div className="stat-card stat-card-green hover-lift">
                        <div className="stat-number stat-number-green">{stats.presentToday}</div>
                        <div className="stat-label stat-label-green">Present Today</div>
                    </div>
                    <div className="stat-card stat-card-purple hover-lift">
                        <div className="stat-number stat-number-purple">{stats.onLeave}</div>
                        <div className="stat-label stat-label-purple">On Leave</div>
                    </div>
                    <div className="stat-card bg-orange-50 hover-lift">
                        <div className="stat-number text-orange-600">{stats.lateToday}</div>
                        <div className="stat-label text-orange-800">Late Today</div>
                    </div>
                </div>
            </div>

            {/* Admin Actions */}
            <div className="info-grid">
                <div className="card hover-lift">
                    <h4 className="card-header">👥 Staff Management</h4>
                    <div className="space-y-3">
                        <button
                            onClick={() => handleAction('manage-staff')}
                            className="btn btn-primary w-full"
                        >
                            👥 Manage Staff
                        </button>
                        <button
                            onClick={() => handleAction('attendance-reports')}
                            className="btn btn-secondary w-full"
                        >
                            📊 Attendance Reports
                        </button>
                        <button
                            onClick={() => handleAction('leave-requests')}
                            className="btn btn-secondary w-full"
                        >
                            🏥 Leave Requests
                        </button>
                        <button
                            onClick={() => handleAction('add-staff')}
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
                            onClick={() => handleAction('shift-management')}
                            className="btn btn-primary w-full"
                        >
                            🔄 Shift Management
                        </button>
                        <button
                            onClick={() => handleAction('analytics')}
                            className="btn btn-secondary w-full"
                        >
                            📈 Analytics Dashboard
                        </button>
                        <button
                            onClick={() => handleAction('schedule-management')}
                            className="btn btn-secondary w-full"
                        >
                            📅 Schedule Management
                        </button>
                        <button
                            onClick={() => handleAction('settings')}
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
                <div className="space-y-3">
                    {recentActivity.map((activity) => {
                        const colorClass = activity.type === 'checkin'
                            ? 'bg-green-50 border-green-200'
                            : activity.type === 'request'
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-yellow-50 border-yellow-200';

                        const textClass = activity.type === 'checkin'
                            ? 'text-green-800'
                            : activity.type === 'request'
                                ? 'text-blue-800'
                                : 'text-yellow-800';

                        const timeClass = activity.type === 'checkin'
                            ? 'text-green-600'
                            : activity.type === 'request'
                                ? 'text-blue-600'
                                : 'text-yellow-600';

                        return (
                            <div key={activity.id} className={`p-3 rounded-lg border ${colorClass}`}>
                                <div className={`text-sm ${textClass}`}>
                                    <strong>{activity.name}</strong> {activity.action}
                                </div>
                                <div className={`text-xs ${timeClass}`}>{activity.timeAgo}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Department Overview */}
            <div className="card hover-lift">
                <h4 className="card-header flex items-center">
                    🏢 Department Overview
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departments.map((dept, index) => {
                        const colors = ['blue', 'green', 'purple', 'orange', 'pink', 'indigo'];
                        const color = colors[index % colors.length];

                        return (
                            <div key={index} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-200`}>
                                <div className={`font-semibold text-${color}-900`}>{dept.name}</div>
                                <div className={`text-${color}-700`}>{dept.totalStaff} Staff Members</div>
                                <div className={`text-sm text-${color}-600`}>{dept.presentToday} Present Today</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quick Reports */}
            <div className="card hover-lift">
                <h4 className="card-header flex items-center">
                    📋 Quick Actions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                        onClick={() => handleAction('daily-report')}
                        className="btn btn-secondary p-4 h-auto"
                    >
                        <div className="text-left">
                            <div className="font-semibold">📊 Daily Report</div>
                            <div className="text-sm text-gray-600">Today's attendance summary</div>
                        </div>
                    </button>
                    <button
                        onClick={() => handleAction('weekly-overtime')}
                        className="btn btn-secondary p-4 h-auto"
                    >
                        <div className="text-left">
                            <div className="font-semibold">⏰ Overtime Report</div>
                            <div className="text-sm text-gray-600">Staff overtime tracking</div>
                        </div>
                    </button>
                    <button
                        onClick={() => handleAction('backup-data')}
                        className="btn btn-secondary p-4 h-auto"
                    >
                        <div className="text-left">
                            <div className="font-semibold">💾 Backup Data</div>
                            <div className="text-sm text-gray-600">Create system backup</div>
                        </div>
                    </button>
                    <button
                        onClick={() => handleAction('send-notification')}
                        className="btn btn-secondary p-4 h-auto"
                    >
                        <div className="text-left">
                            <div className="font-semibold">🔔 Send Alert</div>
                            <div className="text-sm text-gray-600">Notify all staff</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;