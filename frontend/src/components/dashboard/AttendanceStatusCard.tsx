// src/components/dashboard/AttendanceStatusCard.tsx
import React, { useState, useEffect } from 'react';

interface AttendanceData {
    checkInTime?: string;
    totalHours: number;
    weeklyHours: number;
    currentShiftName?: string;
    currentShiftTime?: string;
    status: 'checked-in' | 'checked-out' | 'not-started';
}

const AttendanceStatusCard = () => {
    const [attendanceData, setAttendanceData] = useState<AttendanceData>({
        totalHours: 0,
        weeklyHours: 0,
        status: 'not-started'
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading attendance data - replace with actual API call
        const loadAttendanceData = async () => {
            setIsLoading(true);
            // TODO: Replace with actual API call to get attendance data
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsLoading(false);
        };
        loadAttendanceData();
    }, []);

    const handleCheckIn = async () => {
        // TODO: Implement actual check-in API call
        setAttendanceData(prev => ({
            ...prev,
            status: 'checked-in',
            checkInTime: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        }));
        console.log('Check-in functionality to be implemented');
    };

    const handleCheckOut = async () => {
        // TODO: Implement actual check-out API call
        setAttendanceData(prev => ({
            ...prev,
            status: 'checked-out'
        }));
        console.log('Check-out functionality to be implemented');
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-text">Loading attendance status...</div>
            </div>
        );
    }

    return (
        <>
            <div className="card-header">
                <div className="attendance-status-header">
                    <div className="status-icon-wrapper">
                        <div className={`status-icon ${
                            attendanceData.status === 'checked-in' ? 'status-icon-success' : 
                            attendanceData.status === 'checked-out' ? 'status-icon-info' :
                            'status-icon-warning'
                        }`}>
                            {attendanceData.status === 'checked-in' ? '✓' : 
                             attendanceData.status === 'checked-out' ? '↩' : '✗'}
                        </div>
                        <h3 className="card-title">Today's Attendance</h3>
                    </div>
                    <div className={`status-badge ${
                        attendanceData.status === 'checked-in' ? 'status-badge-success' :
                        attendanceData.status === 'checked-out' ? 'status-badge-info' :
                        'status-badge-warning'
                    }`}>
                        {attendanceData.status === 'checked-in' ? 'Checked In' : 
                         attendanceData.status === 'checked-out' ? 'Checked Out' :
                         'Not Started'}
                    </div>
                </div>
            </div>

            <div className="card-content">
                <div className="attendance-stats">
                    <div className="stat-item">
                        <div className="stat-label">
                            <svg className="stat-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Check-in Time
                        </div>
                        <div className="stat-value">
                            {attendanceData.checkInTime || '-'}
                        </div>
                    </div>

                    <div className="stat-item">
                        <div className="stat-label">
                            <svg className="stat-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            Hours Today
                        </div>
                        <div className="stat-value">
                            {attendanceData.totalHours.toFixed(1)} hours
                        </div>
                    </div>

                    <div className="stat-item">
                        <div className="stat-label">
                            <svg className="stat-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            Current Shift
                        </div>
                        <div className="stat-value">
                            {attendanceData.currentShiftName || 'No shift assigned'}
                            {attendanceData.currentShiftTime && (
                                <div className="stat-subtext">
                                    {attendanceData.currentShiftTime}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="stat-item">
                        <div className="stat-label">
                            <svg className="stat-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Weekly Hours
                        </div>
                        <div className="stat-value">
                            {attendanceData.weeklyHours.toFixed(1)} / 40 hours
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="action-buttons">
                {attendanceData.status === 'not-started' && (
                    <button
                        className="btn btn-primary"
                        onClick={handleCheckIn}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Check In
                    </button>
                )}
                {attendanceData.status === 'checked-in' && (
                    <button
                        className="btn btn-danger"
                        onClick={handleCheckOut}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Check Out
                    </button>
                )}
                {attendanceData.status === 'checked-out' && (
                    <div className="status-complete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Day Complete
                    </div>
                )}
                <button className="btn btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 12a9 9 0 109-9 9 9 0 00-9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    View Timesheet
                </button>
            </div>
        </>
    );
};

export default AttendanceStatusCard;