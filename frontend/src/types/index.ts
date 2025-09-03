// src/types/index.ts
// Main type definitions for the attendance management system

// Base types
export interface Role {
    roleId: number;
    name: string;
    description?: string;
}

export interface Unit {
    unitId: number;
    name: string;
    description?: string;
    createdAt: string;
}

export interface Staff {
    staffId: number;
    fullName: string;
    email: string;
    phone: string;
    employeeId: string;
    dob: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    role: Role;
    unit: Unit;
    passportPath?: string;
    createdAt: string;
    status: 'active' | 'inactive';
}

// Authentication types
export interface LoginRequest {
    identifier: string; // email or employeeId
    password: string;
}

export interface LoginResponse {
    message: string;
    staff: Staff;
}

export interface AuthUser {
    staffId: number;
    fullName: string;
    email: string;
    employeeId: string;
    role: Role;
    unit: Unit;
}

// Attendance types
export interface AttendanceLog {
    logId: number;
    staff: Staff;
    checkInTime: string;
    checkOutTime?: string;
    totalHours: number;
    date: string;
    status: 'present' | 'absent' | 'late' | 'partial';
    notes?: string;
    createdAt: string;
}

export interface AttendanceRecord {
    id: number;
    date: string;
    checkInTime?: string;
    checkOutTime?: string;
    totalHours: number;
    status: 'present' | 'absent' | 'late' | 'partial';
    notes?: string;
}

export interface AttendanceStats {
    presentDays: number;
    absentDays: number;
    lateArrivals: number;
    totalWorkingDays: number;
    totalHours: number;
    averageHoursPerDay: number;
}

// Shift management types
export interface ShiftType {
    shiftTypeId: number;
    name: string;
    startTime: string;
    endTime: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
}

export interface Shift {
    shiftId: number;
    staff: Staff;
    shiftType: ShiftType;
    date: string;
    status: 'scheduled' | 'active' | 'completed' | 'cancelled';
    createdAt: string;
}

export interface ShiftRequest {
    requestId: number;
    staff: Staff;
    requestedShiftType: ShiftType;
    currentShiftType: ShiftType;
    requestedDate: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    reviewedBy?: Staff;
    reviewedAt?: string;
    reviewNotes?: string;
    createdAt: string;
}

// Schedule types
export interface Schedule {
    scheduleId: number;
    staff: Staff;
    shift: Shift;
    date: string;
    isActive: boolean;
    createdAt: string;
}

// Admin dashboard types
export interface SystemStats {
    totalStaff: number;
    presentToday: number;
    onLeave: number;
    lateToday: number;
    pendingRequests: number;
    activeShifts: number;
}

export interface DepartmentStats {
    unitId: number;
    unitName: string;
    totalStaff: number;
    presentToday: number;
    attendanceRate: number;
}

export interface RecentActivity {
    id: number;
    staffName: string;
    action: string;
    timestamp: string;
    type: 'check-in' | 'check-out' | 'leave-request' | 'shift-request';
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: string[];
}

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

// Request types for creating/updating entities
export interface CreateStaffRequest {
    fullName: string;
    email: string;
    phone: string;
    employeeId: string;
    dob: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    password: string;
    roleId: number;
    unitId: number;
    passportPath?: string;
}

export interface UpdateStaffRequest extends Partial<CreateStaffRequest> {
    staffId: number;
}

export interface AttendanceCheckRequest {
    staffId: number;
    action: 'check-in' | 'check-out';
    timestamp?: string;
    notes?: string;
}

export interface CreateShiftRequestRequest {
    staffId: number;
    requestedShiftTypeId: number;
    requestedDate: string;
    reason: string;
}

export interface ReviewShiftRequestRequest {
    requestId: number;
    status: 'approved' | 'rejected';
    reviewNotes?: string;
}

// Filter and search types
export interface StaffFilterParams {
    search?: string;
    roleId?: number;
    unitId?: number;
    status?: 'active' | 'inactive';
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
}

export interface AttendanceFilterParams {
    staffId?: number;
    startDate?: string;
    endDate?: string;
    status?: 'present' | 'absent' | 'late' | 'partial';
    page?: number;
    size?: number;
}

export interface ShiftRequestFilterParams {
    staffId?: number;
    status?: 'pending' | 'approved' | 'rejected';
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
}
