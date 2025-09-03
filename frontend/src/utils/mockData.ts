// src/utils/mockData.ts - Deprecated, use actual API data
// This file is kept for reference during migration

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