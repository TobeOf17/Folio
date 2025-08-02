// src/components/Dashboard.tsx
import {useState, useEffect} from 'react';
import {Staff} from '../services/auth';

interface DashboardProps {
    user: Staff,
    onLogout?: () => Promise<void>
}

interface AttendanceLog {
    attendanceId: number;
    date: string;
    signInTime: string;
    signOutTime?: string;
    status: 'ON_TIME' | 'LATE' | 'ABSENT' | 'EARLY_SIGN_OUT';
}

interface AttendanceSummary {
    totalRecords: number;
    onTimeDays: number;
    lateDays: number;
    absentDays: number;
    averageWorkingHours: number;
}

export default function Dashboard({user, onLogout}: DashboardProps) {
    const [todayAttendance, setTodayAttendance] = useState<AttendanceLog | null>(null);
    const [recentAttendance, setRecentAttendance] = useState<AttendanceLog[]>([]);
    const [summary, setSummary] = useState<AttendanceSummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);

            // Fetch recent attendance records
            const attendanceResponse = await fetch('http://localhost:8080/api/attendance/my-records', {
                credentials: 'include'
            });

            if (attendanceResponse.ok) {
                const records = await attendanceResponse.json();
                setRecentAttendance(records.slice(0, 5)); // Get last 5 records

                // Check if there's attendance for today
                const today = new Date().toISOString().split('T')[0];
                const todayRecord = records.find((record: AttendanceLog) =>
                    record.date === today
                );
                setTodayAttendance(todayRecord || null);
            }

            // Fetch attendance summary for current month
            const now = new Date();
            const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
            const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

            const summaryResponse = await fetch(
                `http://localhost:8080/api/attendance/summary/${user.staffId}?startDate=${startDate}&endDate=${endDate}`,
                {credentials: 'include'}
            );

            if (summaryResponse.ok) {
                const summaryData = await summaryResponse.json();
                setSummary(summaryData);
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignIn = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/attendance/sign-in', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                const result = await response.json();
                setTodayAttendance(result.attendanceLog);
                fetchDashboardData(); // Refresh data
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error('Sign-in error:', error);
            alert('Failed to sign in');
        }
    };

    const handleSignOut = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/attendance/sign-out', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                const result = await response.json();
                setTodayAttendance(result.attendanceLog);
                fetchDashboardData(); // Refresh data
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error('Sign-out error:', error);
            alert('Failed to sign out');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ON_TIME':
                return 'text-green-600 bg-green-100';
            case 'LATE':
                return 'text-yellow-600 bg-yellow-100';
            case 'ABSENT':
                return 'text-red-600 bg-red-100';
            case 'EARLY_SIGN_OUT':
                return 'text-orange-600 bg-orange-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const formatTime = (timeString: string) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user.fullName}!
                </h1>
                <p className="text-gray-600 mt-1">
                    {user.role.name} • Employee ID: {user.employeeId}
                </p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Attendance</h2>

                {todayAttendance ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium">Signed in at: {formatTime(todayAttendance.signInTime)}</p>
                                {todayAttendance.signOutTime && (
                                    <p className="text-gray-600">Signed out
                                        at: {formatTime(todayAttendance.signOutTime)}</p>
                                )}
                                <span
                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(todayAttendance.status)}`}>
                  {todayAttendance.status.replace('_', ' ')}
                </span>
                            </div>

                            {!todayAttendance.signOutTime && (
                                <button
                                    onClick={handleSignOut}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">You haven't signed in today yet.</p>
                        <button
                            onClick={handleSignIn}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Sign In Now
                        </button>
                    </div>
                )}
            </div>

            {/* Monthly Summary */}
            {summary && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <span className="text-blue-600 text-lg">📅</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Total Days</p>
                                <p className="text-2xl font-bold text-gray-900">{summary.totalRecords}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <span className="text-green-600 text-lg">✅</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">On Time</p>
                                <p className="text-2xl font-bold text-gray-900">{summary.onTimeDays}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <span className="text-yellow-600 text-lg">⏰</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Late Days</p>
                                <p className="text-2xl font-bold text-gray-900">{summary.lateDays}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <span className="text-red-600 text-lg">❌</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Absent Days</p>
                                <p className="text-2xl font-bold text-gray-900">{summary.absentDays}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Attendance */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Attendance</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sign In
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sign Out
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {recentAttendance.map((record) => (
                            <tr key={record.attendanceId}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(record.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {formatTime(record.signInTime)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {record.signOutTime ? formatTime(record.signOutTime) : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                      {record.status.replace('_', ' ')}
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}