// src/types/auth.ts (UPDATED - Add admin types)
export interface Staff {
    staffId: string;
    fullName: string;
    role: {
        name: string;
    };
}

export interface LoginResponse {
    message: string;
    staff: Staff;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: Staff | null;
    login: (staff: Staff) => void;
    logout: () => void;
    isAdmin: () => boolean;
}

// NEW: Admin types
export interface DashboardStats {
    totalUsers: number;
    totalRoles: number;
    activeUsers: number;
}

export interface Role {
    roleId: number;
    name: string;
    description?: string;
}