// src/components/dashboard/StaffDashboard.tsx
import React from 'react';
import { mockData } from '../../utils/mockData';

const StaffDashboard = () => {
    return (
        <div className="space-y-6">
            {/* Monthly Stats */}
            <div className="card hover-lift">
                <h3 className="card-header flex items-center">
                    📈 Monthly Attendance Summary
                </h3>
                <div className="stats-grid">
                    <div className="stat-card stat-card-green hover-lift">
                        <div className="stat-number stat-number-green">{mockData.stats.presentDays}</div>
                        <div className="stat-label stat-label-green">Present Days</div>
                    </div>
                    <div className="stat-card stat-card-blue hover-lift">
                        <div className="stat-number stat-number-blue">{mockData.stats.absentDays}</div>
                        <div className="stat-label stat-label-blue">Absent Days</div>
                    </div>
                    <div className="stat-card stat-card-purple hover-lift">
                        <div className="stat-number stat-number-purple">{mockData.stats.lateArrivals}</div>
                        <div className="stat-label stat-label-purple">Late Arrivals</div>
                    </div>
                </div>
            </div>

            {/* Shift Management */}
            <div className="info-grid">
                <div className="card hover-lift">
                    <h4 className="card-header flex items-center">
                        🔄 Shift Management
                    </h4>
                    <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="font-semibold text-blue-900">Current Shift</div>
                            <div className="text-blue-700">{mockData.shifts.current.name}</div>
                            <div className="text-sm text-blue-600">{mockData.shifts.current.time}</div>
                        </div>

                        <div className="space-y-3">
                            <button className="btn btn-primary w-full">
                                🔄 Request Shift Change
                            </button>
                            <button className="btn btn-secondary w-full">
                                📅 View Shift Schedule
                            </button>
                            <button className="btn btn-secondary w-full">
                                🔔 Shift Notifications
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card hover-lift">
                    <h4 className="card-header flex items-center">
                        📋 Quick Actions
                    </h4>
                    <div className="space-y-3">
                        <button className="btn btn-primary w-full">
                            🏥 Request Leave
                        </button>
                        <button className="btn btn-secondary w-full">
                            ⏰ View Attendance History
                        </button>
                        <button className="btn btn-secondary w-full">
                            📊 Monthly Report
                        </button>
                        <button className="btn btn-secondary w-full">
                            ⚙️ Update Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Upcoming Shifts */}
            <div className="card hover-lift">
                <h4 className="card-header flex items-center">
                    📅 Upcoming Shifts
                </h4>
                <div className="space-y-3">
                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-semibold text-yellow-900">Tomorrow</div>
                                <div className="text-yellow-700">{mockData.shifts.upcoming.name}</div>
                                <div className="text-sm text-yellow-600">{mockData.shifts.upcoming.time}</div>
                            </div>
                            <div className="text-yellow-600">
                                📌
                            </div>
                        </div>
                    </div>

                    <div className="text-center py-4">
                        <button className="btn btn-secondary">
                            📅 View Full Schedule
                        </button>
                    </div>
                </div>
            </div>

            {/* Overtime Summary */}
            <div className="card hover-lift">
                <h4 className="card-header flex items-center">
                    ⏱️ Overtime & Hours
                </h4>
                <div className="info-grid">
                    <div className="info-section">
                        <div className="form-group">
                            <label className="label">Monthly Overtime</label>
                            <div className="info-text font-semibold text-lg text-orange-700">
                                {mockData.stats.overtime}
                            </div>
                        </div>
                    </div>
                    <div className="info-section">
                        <div className="form-group">
                            <label className="label">Total Hours This Month</label>
                            <div className="info-text font-semibold text-lg text-blue-700">
                                168 hours
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;