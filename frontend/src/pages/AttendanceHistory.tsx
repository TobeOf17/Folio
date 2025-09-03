// src/pages/AttendanceHistory.tsx
import React, { useState, useEffect } from 'react';

interface AttendanceRecord {
    id: number;
    date: string;
    checkInTime?: string;
    checkOutTime?: string;
    totalHours: number;
    status: 'present' | 'absent' | 'late' | 'partial';
    notes?: string;
}

const AttendanceHistory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        loadAttendanceHistory();
    }, [selectedMonth, selectedYear]);

    const loadAttendanceHistory = async () => {
        setIsLoading(true);
        try {
            // TODO: Replace with actual API call
            // const response = await getAttendanceHistory(selectedMonth, selectedYear);
            // setAttendanceRecords(response);
            
            // Simulate loading
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Failed to load attendance history:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const classes = {
            present: 'bg-green-100 text-green-800 border-green-200',
            absent: 'bg-red-100 text-red-800 border-red-200',
            late: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            partial: 'bg-orange-100 text-orange-800 border-orange-200'
        };

        const icons = {
            present: '✅',
            absent: '❌',
            late: '⏰',
            partial: '⚠️'
        };

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${classes[status as keyof typeof classes]}`}>
                <span className="mr-1">{icons[status as keyof typeof icons]}</span>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    if (isLoading) {
        return (
            <div className="content-wrapper">
                <div className="card">
                    <div className="loading-container">
                        <div className="loading-text">Loading attendance history...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="content-wrapper">
            {/* Header */}
            <div className="mb-8">
                <h2 className="page-title">📊 Attendance History</h2>
                <p className="page-subtitle">View your detailed attendance records</p>
            </div>

            {/* Date Filter */}
            <div className="card mb-6">
                <h3 className="card-header">Filter Records</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="label">Month</label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-base"
                        >
                            {monthNames.map((month, index) => (
                                <option key={index} value={index}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label">Year</label>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-base"
                        >
                            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Attendance Records */}
            <div className="card">
                <h3 className="card-header">
                    {monthNames[selectedMonth]} {selectedYear} Records
                </h3>

                {attendanceRecords.length > 0 ? (
                    <div className="space-y-3">
                        {attendanceRecords.map((record) => (
                            <div key={record.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="font-semibold text-gray-900">
                                        {new Date(record.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    {getStatusBadge(record.status)}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Check In: </span>
                                        <span className="font-medium text-green-600">
                                            {record.checkInTime || '-'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Check Out: </span>
                                        <span className="font-medium text-blue-600">
                                            {record.checkOutTime || '-'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Total Hours: </span>
                                        <span className="font-medium text-red-600">
                                            {record.totalHours.toFixed(1)}h
                                        </span>
                                    </div>
                                </div>

                                {record.notes && (
                                    <div className="mt-2 text-sm text-gray-600 bg-white p-2 rounded">
                                        <strong>Notes:</strong> {record.notes}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-500 mb-4 text-4xl">📅</div>
                        <div className="text-gray-600 text-lg font-semibold mb-2">
                            No attendance records found
                        </div>
                        <div className="text-gray-500">
                            Records for {monthNames[selectedMonth]} {selectedYear} will appear here once you start tracking attendance.
                        </div>
                    </div>
                )}
            </div>

            {/* Summary Stats */}
            {attendanceRecords.length > 0 && (
                <div className="card mt-6">
                    <h3 className="card-header">Monthly Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                            <div className="text-2xl font-bold text-green-600">
                                {attendanceRecords.filter(r => r.status === 'present').length}
                            </div>
                            <div className="text-sm text-green-800">Present Days</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-xl">
                            <div className="text-2xl font-bold text-red-600">
                                {attendanceRecords.filter(r => r.status === 'absent').length}
                            </div>
                            <div className="text-sm text-red-800">Absent Days</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-xl">
                            <div className="text-2xl font-bold text-yellow-600">
                                {attendanceRecords.filter(r => r.status === 'late').length}
                            </div>
                            <div className="text-sm text-yellow-800">Late Days</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                            <div className="text-2xl font-bold text-blue-600">
                                {attendanceRecords.reduce((total, record) => total + record.totalHours, 0).toFixed(1)}
                            </div>
                            <div className="text-sm text-blue-800">Total Hours</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceHistory;
