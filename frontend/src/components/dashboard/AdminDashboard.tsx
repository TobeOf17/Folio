// src/components/dashboard/AdminDashboard.tsx
import React from 'react';

const AdminDashboard = () => {
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
                        <div className="stat-number stat-number-blue">45</div>
                        <div className="stat-label stat-label-blue">Total Staff</div>
                    </div>
                    <div className="stat-card stat-card-green hover-lift">
                        <div className="stat-number stat-number-green">38</div>
                        <div className="stat-label stat-label-green">Present Today</div>
                    </div>
                    <div className="stat-card stat-card-purple hover-lift">
                        <div className="stat-number stat-number-purple">7</div>
                        <div className="stat-label stat-label-purple">On Leave</div>
                    </div>
                    <div className="stat-card bg-orange-50 hover-lift">
                        <div className="stat-number text-orange-600">3</div>
                        <div className="stat-label text-orange-800">Late Today</div>
                    </div>
                </div>
            </div>

            {/* Admin Actions */}
            <div className="info-grid">
                <div className="card hover-lift">
                    <h4 className="card-header">Staff Management</h4>
                    <div className="space-y-3">
                        <button className="btn btn-primary w-full">
                            👥 Manage Staff
                        </button>
                        <button className="btn btn-secondary w-full">
                            📊 Attendance Reports
                        </button>
                        <button className="btn btn-secondary w-full">
                            🏥 Leave Requests
                        </button>
                        <button className="btn btn-secondary w-full">
                            ➕ Add New Staff
                        </button>
                    </div>
                </div>

                <div className="card hover-lift">
                    <h4 className="card-header">System Administration</h4>
                    <div className="space-y-3">
                        <button className="btn btn-primary w-full">
                            🔄 Shift Management
                        </button>
                        <button className="btn btn-secondary w-full">
                            📅 Schedule Management
                        </button>
                        <button className="btn btn-secondary w-full">
                            📈 Analytics Dashboard
                        </button>
                        <button className="btn btn-secondary w-full">
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
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm text-green-800">
                            <strong>John Doe</strong> checked in at 8:30 AM
                        </div>
                        <div className="text-xs text-green-600">2 minutes ago</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-sm text-blue-800">
                            <strong>Jane Smith</strong> requested shift change
                        </div>
                        <div className="text-xs text-blue-600">15 minutes ago</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="text-sm text-yellow-800">
                            <strong>Mike Johnson</strong> submitted leave request
                        </div>
                        <div className="text-xs text-yellow-600">1 hour ago</div>
                    </div>
                </div>
            </div>

            {/* Department Overview */}
            <div className="card hover-lift">
                <h4 className="card-header flex items-center">
                    🏢 Department Overview
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="font-semibold text-blue-900">IT Department</div>
                        <div className="text-blue-700">5 Staff Members</div>
                        <div className="text-sm text-blue-600">4 Present Today</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="font-semibold text-green-900">HR Department</div>
                        <div className="text-green-700">8 Staff Members</div>
                        <div className="text-sm text-green-600">7 Present Today</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <div className="font-semibold text-purple-900">Finance</div>
                        <div className="text-purple-700">6 Staff Members</div>
                        <div className="text-sm text-purple-600">6 Present Today</div>
                    </div>
                </div>
            </div>

            {/* Quick Reports */}
            <div className="card hover-lift">
                <h4 className="card-header flex items-center">
                    📋 Quick Reports
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="btn btn-secondary p-4 h-auto">
                        <div className="text-left">
                            <div className="font-semibold">Daily Attendance Report</div>
                            <div className="text-sm text-gray-600">Today's attendance summary</div>
                        </div>
                    </button>
                    <button className="btn btn-secondary p-4 h-auto">
                        <div className="text-left">
                            <div className="font-semibold">Weekly Overtime Report</div>
                            <div className="text-sm text-gray-600">Staff overtime tracking</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;