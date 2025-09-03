// src/services/api.ts
import axios from 'axios';
import {
    LoginRequest,
    LoginResponse,
    Staff,
    Role,
    Unit,
    SystemStats,
    DepartmentStats,
    RecentActivity,
    AttendanceLog,
    AttendanceStats,
    AttendanceRecord,
    AttendanceCheckRequest,
    ShiftType,
    Shift,
    ShiftRequest,
    CreateShiftRequestRequest,
    ReviewShiftRequestRequest,
    Schedule,
    CreateStaffRequest,
    UpdateStaffRequest,
    StaffFilterParams,
    AttendanceFilterParams,
    ShiftRequestFilterParams,
    PaginatedResponse,
} from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add request interceptor for authentication
api.interceptors.request.use(
    (config) => {
        // Add any auth tokens here if needed
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// =============================================================================
// AUTHENTICATION ENDPOINTS
// =============================================================================

export const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', loginData);
    return response.data;
};

export const logout = async (): Promise<void> => {
    await api.post('/auth/logout');
};

export const getCurrentUser = async (): Promise<Staff> => {
    const response = await api.get<Staff>('/auth/me');
    return response.data;
};

// =============================================================================
// ATTENDANCE ENDPOINTS
// =============================================================================

export const checkInOut = async (checkData: AttendanceCheckRequest): Promise<AttendanceLog> => {
    const response = await api.post<AttendanceLog>('/attendance/check', checkData);
    return response.data;
};

export const getTodayAttendance = async (staffId: number): Promise<AttendanceLog | null> => {
    const response = await api.get<AttendanceLog | null>(`/attendance/today/${staffId}`);
    return response.data;
};

export const getAttendanceHistory = async (
    staffId: number,
    params: AttendanceFilterParams = {}
): Promise<PaginatedResponse<AttendanceRecord>> => {
    const response = await api.get<PaginatedResponse<AttendanceRecord>>(
        `/attendance/history/${staffId}`,
        { params }
    );
    return response.data;
};

export const getAttendanceStats = async (
    staffId: number,
    month?: number,
    year?: number
): Promise<AttendanceStats> => {
    const response = await api.get<AttendanceStats>(`/attendance/stats/${staffId}`, {
        params: { month, year }
    });
    return response.data;
};

// =============================================================================
// STAFF ENDPOINTS
// =============================================================================

export const getAllStaff = async (params: StaffFilterParams = {}): Promise<PaginatedResponse<Staff>> => {
    const response = await api.get<PaginatedResponse<Staff>>('/staff', { params });
    return response.data;
};

export const getStaffById = async (staffId: number): Promise<Staff> => {
    const response = await api.get<Staff>(`/staff/${staffId}`);
    return response.data;
};

export const createStaff = async (staffData: CreateStaffRequest): Promise<Staff> => {
    const response = await api.post<Staff>('/staff', staffData);
    return response.data;
};

export const updateStaff = async (staffData: UpdateStaffRequest): Promise<Staff> => {
    const response = await api.put<Staff>(`/staff/${staffData.staffId}`, staffData);
    return response.data;
};

export const deactivateStaff = async (staffId: number): Promise<void> => {
    await api.patch(`/staff/${staffId}/deactivate`);
};

export const activateStaff = async (staffId: number): Promise<void> => {
    await api.patch(`/staff/${staffId}/activate`);
};

// =============================================================================
// SHIFT MANAGEMENT ENDPOINTS
// =============================================================================

export const getAllShiftTypes = async (): Promise<ShiftType[]> => {
    const response = await api.get<ShiftType[]>('/shifts/types');
    return response.data;
};

export const createShiftType = async (shiftTypeData: Partial<ShiftType>): Promise<ShiftType> => {
    const response = await api.post<ShiftType>('/shifts/types', shiftTypeData);
    return response.data;
};

export const getStaffShifts = async (
    staffId: number,
    startDate?: string,
    endDate?: string
): Promise<Shift[]> => {
    const response = await api.get<Shift[]>(`/shifts/staff/${staffId}`, {
        params: { startDate, endDate }
    });
    return response.data;
};

export const createShiftRequest = async (requestData: CreateShiftRequestRequest): Promise<ShiftRequest> => {
    const response = await api.post<ShiftRequest>('/shifts/requests', requestData);
    return response.data;
};

export const getShiftRequests = async (
    params: ShiftRequestFilterParams = {}
): Promise<PaginatedResponse<ShiftRequest>> => {
    const response = await api.get<PaginatedResponse<ShiftRequest>>('/shifts/requests', { params });
    return response.data;
};

export const reviewShiftRequest = async (reviewData: ReviewShiftRequestRequest): Promise<ShiftRequest> => {
    const response = await api.patch<ShiftRequest>(
        `/shifts/requests/${reviewData.requestId}/review`,
        reviewData
    );
    return response.data;
};

// =============================================================================
// SCHEDULE ENDPOINTS
// =============================================================================

export const getSchedules = async (
    staffId?: number,
    startDate?: string,
    endDate?: string
): Promise<Schedule[]> => {
    const response = await api.get<Schedule[]>('/schedules', {
        params: { staffId, startDate, endDate }
    });
    return response.data;
};

export const createSchedule = async (scheduleData: Partial<Schedule>): Promise<Schedule> => {
    const response = await api.post<Schedule>('/schedules', scheduleData);
    return response.data;
};

export const updateSchedule = async (scheduleId: number, scheduleData: Partial<Schedule>): Promise<Schedule> => {
    const response = await api.put<Schedule>(`/schedules/${scheduleId}`, scheduleData);
    return response.data;
};

export const deleteSchedule = async (scheduleId: number): Promise<void> => {
    await api.delete(`/schedules/${scheduleId}`);
};

// =============================================================================
// ADMIN ENDPOINTS
// =============================================================================

export const getSystemStats = async (): Promise<SystemStats> => {
    const response = await api.get<SystemStats>('/admin/stats');
    return response.data;
};

export const getDepartmentStats = async (): Promise<DepartmentStats[]> => {
    const response = await api.get<DepartmentStats[]>('/admin/departments/stats');
    return response.data;
};

export const getRecentActivity = async (limit: number = 10): Promise<RecentActivity[]> => {
    const response = await api.get<RecentActivity[]>('/admin/activity/recent', {
        params: { limit }
    });
    return response.data;
};

export const getAllStaffForAdmin = async (params: StaffFilterParams = {}): Promise<PaginatedResponse<Staff>> => {
    const response = await api.get<PaginatedResponse<Staff>>('/admin/staff', { params });
    return response.data;
};

export const getAttendanceReports = async (
    startDate: string,
    endDate: string,
    unitId?: number
): Promise<any> => {
    const response = await api.get('/admin/reports/attendance', {
        params: { startDate, endDate, unitId }
    });
    return response.data;
};

// =============================================================================
// ROLES & UNITS ENDPOINTS
// =============================================================================

export const getAllRoles = async (): Promise<Role[]> => {
    const response = await api.get<Role[]>('/roles');
    return response.data;
};

export const createRole = async (roleData: Partial<Role>): Promise<Role> => {
    const response = await api.post<Role>('/roles', roleData);
    return response.data;
};

export const updateRole = async (roleId: number, roleData: Partial<Role>): Promise<Role> => {
    const response = await api.put<Role>(`/roles/${roleId}`, roleData);
    return response.data;
};

export const getAllUnits = async (): Promise<Unit[]> => {
    const response = await api.get<Unit[]>('/units');
    return response.data;
};

export const createUnit = async (unitData: Partial<Unit>): Promise<Unit> => {
    const response = await api.post<Unit>('/units', unitData);
    return response.data;
};

export const updateUnit = async (unitId: number, unitData: Partial<Unit>): Promise<Unit> => {
    const response = await api.put<Unit>(`/units/${unitId}`, unitData);
    return response.data;
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Helper function to handle API errors
export const handleApiError = (error: any): string => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }
    if (error.response?.data?.errors) {
        return error.response.data.errors.join(', ');
    }
    return error.message || 'An unexpected error occurred';
};

// Helper function to build query parameters
export const buildQueryParams = (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
        }
    });
    return searchParams.toString();
};

export default api;
