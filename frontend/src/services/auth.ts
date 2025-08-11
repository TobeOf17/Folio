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