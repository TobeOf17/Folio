// src/components/dashboard/AttendanceStatusCard.tsx
import React, { useState } from 'react';
import { mockData } from '../../utils/mockData';

const AttendanceStatusCard = () => {
    const [isCheckedIn, setIsCheckedIn] = useState(true);

    const handleCheckInOut = () => {
        setIsCheckedIn(!isCheckedIn);
        // Here you would call your API to check in/out
    };

    return (
        <div className="card hover-lift mb-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="card-header mb-0 flex items-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold mr-3 ${
                        isCheckedIn ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-red-600'
                    }`}>
                        {isCheckedIn ? '✓' : '✗'}
                    </div>
                    Today's Attendance
                </h3>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isCheckedIn
                        ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300'
                        : 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 border border-red-300'
                }`}>
                    {isCheckedIn ? '🟢 Checked In' : '🔴 Not Checked In'}
                </div>
            </div>

            <div className="info-grid gap-8">
                <div className="info-section">
                    <div className="form-group">
                        <label className="label flex items-center">
                            <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Check-in Time
                        </label>
                        <div className="info-text font-mono text-lg font-semibold text-green-700">
                            {mockData.attendance.checkInTime}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="label flex items-center">
                            <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            Hours Today
                        </label>
                        <div className="info-text font-semibold text-lg text-blue-700">
                            {mockData.attendance.totalHours} hours
                        </div>
                    </div>
                </div>

                <div className="info-section">
                    <div className="form-group">
                        <label className="label flex items-center">
                            <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            Current Shift
                        </label>
                        <div className="info-text font-semibold text-lg text-purple-700">
                            {mockData.shifts.current.name}
                            <div className="text-sm text-gray-600 mt-1">
                                {mockData.shifts.current.time}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="label flex items-center">
                            <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Weekly Hours
                        </label>
                        <div className="info-text font-semibold text-lg text-orange-700">
                            {mockData.attendance.weeklyHours} / 40 hours
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 mt-6">
                <button
                    className={`btn btn-large flex-1 ${
                        isCheckedIn ? 'btn-danger' : 'btn-primary'
                    }`}
                    onClick={handleCheckInOut}
                >
                    {isCheckedIn ? '🚪 Check Out' : '🚪 Check In'}
                </button>
                <button className="btn btn-secondary btn-large">
                    📊 View Timesheet
                </button>
            </div>
        </div>
    );
};

export default AttendanceStatusCard;