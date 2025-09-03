// src/components/dashboard/StaffDashboard.tsx
import React, { useState, useEffect } from 'react';

interface AttendanceStats {
    presentDays: number;
    absentDays: number;
    lateArrivals: number;
    totalWorkingDays: number;
}

interface CurrentShift {
    id?: number;
    name: string;
    startTime: string;
    endTime: string;
    status: 'active' | 'upcoming' | 'completed';
}

const StaffDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null);
    const [currentShift, setCurrentShift] = useState<CurrentShift | null>(null);
    const [attendanceStatus, setAttendanceStatus] = useState<'checked-in' | 'checked-out' | 'not-started'>('not-started');

    useEffect(() => {
        // Simulate loading - replace with actual API calls
        const loadData = async () => {
            setIsLoading(true);
            // TODO: Replace with actual API calls
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsLoading(false);
        };
        loadData();
    }, []);

    const handleCheckIn = () => {
        // TODO: Implement actual check-in functionality
        setAttendanceStatus('checked-in');
        console.log('Check-in functionality to be implemented');
    };

    const handleCheckOut = () => {
        // TODO: Implement actual check-out functionality
        setAttendanceStatus('checked-out');
        console.log('Check-out functionality to be implemented');
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="card">
                    <div className="loading-container">
                        <div className="loading-text">Loading dashboard...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Today's Attendance */}
            <div className="card hover-lift">
                <h3 className="card-header flex items-center">
                    🕐 Today's Attendance
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                            <div className="text-lg font-semibold text-gray-900">
                                {attendanceStatus === 'checked-in' ? 'Checked In' : 
                                 attendanceStatus === 'checked-out' ? 'Checked Out' : 'Not Started'}
                            </div>
                            <div className="text-sm text-gray-600">
                                {attendanceStatus === 'checked-in' ? 'Working since 9:00 AM' :
                                 attendanceStatus === 'checked-out' ? 'Completed 8 hours' :
                                 'Ready to start your day'}
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {attendanceStatus === 'not-started' && (
                                <button onClick={handleCheckIn} className="btn btn-primary">
                                    ✓ Check In
                                </button>
                            )}
                            {attendanceStatus === 'checked-in' && (
                                <button onClick={handleCheckOut} className="btn btn-danger">
                                    ↩ Check Out
                                </button>
                            )}
                            {attendanceStatus === 'checked-out' && (
                                <div className="text-green-600 font-semibold">✓ Day Complete</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Monthly Stats */}
            <div className="card hover-lift">
                <h3 className="card-header flex items-center">
                    📈 Monthly Attendance Summary
                </h3>
                {attendanceStats ? (
                    <div className="stats-grid">
                        <div className="stat-card stat-card-green hover-lift">
                            <div className="stat-number stat-number-green">{attendanceStats.presentDays}</div>
                            <div className="stat-label stat-label-green">Present Days</div>
                        </div>
                        <div className="stat-card stat-card-blue hover-lift">
                            <div className="stat-number stat-number-blue">{attendanceStats.absentDays}</div>
                            <div className="stat-label stat-label-blue">Absent Days</div>
                        </div>
                        <div className="stat-card stat-card-red hover-lift">
                            <div className="stat-number stat-number-red">{attendanceStats.lateArrivals}</div>
                            <div className="stat-label stat-label-red">Late Arrivals</div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-gray-500 mb-4">📊</div>
                        <div className="text-gray-600">No attendance data available yet</div>
                        <div className="text-sm text-gray-500">Data will appear after your first day</div>
                    </div>
                )}
            </div>

            {/* Current Shift Information */}
            <div className="info-grid">
                <div className="card hover-lift">
                    <h4 className="card-header flex items-center">
                        🔄 Current Shift
                    </h4>
                    {currentShift ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                                <div className="font-semibold text-blue-900">{currentShift.name}</div>
                                <div className="text-blue-700">{currentShift.startTime} - {currentShift.endTime}</div>
                                <div className="text-sm text-blue-600 capitalize">
                                    Status: {currentShift.status}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <button className="btn btn-secondary w-full">
                                    📅 View Schedule
                                </button>
                                <button className="btn btn-secondary w-full">
                                    🔄 Request Shift Change
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-gray-500 mb-4">🔄</div>
                            <div className="text-gray-600">No shift assigned</div>
                            <div className="text-sm text-gray-500">Contact your manager for shift assignment</div>
                        </div>
                    )}
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

            {/* Work Hours Summary */}
            <div className="card hover-lift">
                <h4 className="card-header flex items-center">
                    ⏱️ Work Hours Summary
                </h4>
                <div className="info-grid">
                    <div className="info-section">
                        <div className="form-group">
                            <label className="label">Today's Hours</label>
                            <div className="info-text font-semibold text-lg text-blue-700">
                                {attendanceStatus === 'checked-in' ? 'In Progress' :
                                 attendanceStatus === 'checked-out' ? '8.0 hours' : '0 hours'}
                            </div>
                        </div>
                    </div>
                    <div className="info-section">
                        <div className="form-group">
                            <label className="label">This Week</label>
                            <div className="info-text font-semibold text-lg text-green-700">
                                -
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <button className="btn btn-secondary">
                        📈 View Detailed Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;