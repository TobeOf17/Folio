// src/utils/mockData.ts

export const mockData = {
    attendance: {
        todayStatus: 'Checked In',
        checkInTime: '08:30 AM',
        totalHours: '7.5',
        weeklyHours: '37.5'
    },
    shifts: {
        current: {
            name: 'Day Shift',
            time: '08:00 - 17:00',
            date: 'Today'
        },
        upcoming: {
            name: 'Night Shift',
            time: '18:00 - 02:00',
            date: 'Tomorrow'
        },
        pending: 2
    },
    stats: {
        presentDays: 22,
        absentDays: 1,
        lateArrivals: 3,
        overtime: '12.5 hrs'
    },
    admin: {
        totalStaff: 45,
        presentToday: 38,
        onLeave: 7,
        lateToday: 3
    },
    departments: [
        { name: 'IT Department', total: 5, present: 4 },
        { name: 'HR Department', total: 8, present: 7 },
        { name: 'Finance', total: 6, present: 6 },
        { name: 'Operations', total: 12, present: 10 },
        { name: 'Marketing', total: 8, present: 7 },
        { name: 'Customer Service', total: 6, present: 4 }
    ],
    recentActivity: [
        {
            id: 1,
            user: 'John Doe',
            action: 'checked in',
            time: '8:30 AM',
            timeAgo: '2 minutes ago',
            type: 'check-in'
        },
        {
            id: 2,
            user: 'Jane Smith',
            action: 'requested shift change',
            time: '8:15 AM',
            timeAgo: '15 minutes ago',
            type: 'shift-request'
        },
        {
            id: 3,
            user: 'Mike Johnson',
            action: 'submitted leave request',
            time: '7:30 AM',
            timeAgo: '1 hour ago',
            type: 'leave-request'
        },
        {
            id: 4,
            user: 'Sarah Wilson',
            action: 'checked out',
            time: '5:00 PM',
            timeAgo: '3 hours ago',
            type: 'check-out'
        }
    ]
};

export interface AttendanceData {
    todayStatus: string;
    checkInTime: string;
    totalHours: string;
    weeklyHours: string;
}

export interface ShiftData {
    current: {
        name: string;
        time: string;
        date: string;
    };
    upcoming: {
        name: string;
        time: string;
        date: string;
    };
    pending: number;
}

export interface StatsData {
    presentDays: number;
    absentDays: number;
    lateArrivals: number;
    overtime: string;
}

export interface AlertData {
    id: number;
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
    role: string[];
}