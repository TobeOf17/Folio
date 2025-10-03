export interface Role {
    roleId: number;
    name: string;
}

export interface Unit {
    unitId: number;
    name: string;
}

export interface Company {
    id: number;
    name: string;
    industry: string;
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
    company: Company;
    passportPath?: string;
    createdAt: string;
    admin: boolean;
}

export interface AttendanceLog {
    logId: number;
    staff: Staff;
    date: string;
    signInTime?: string;
    signOutTime?: string;
    status: 'ON_TIME' | 'LATE' | 'ABSENT' | 'EARLY_SIGN_OUT';
}

export interface AttendanceSummary {
    staffName: string;
    onTimeDays: number;
    lateDays: number;
    absentDays: number;
    earlySignOutDays: number;
    totalRecords: number;
}

export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface SignupRequest {
    companyName: string;
    industry: string;
    adminName: string;
    adminEmail: string;
    adminPassword: string;
}
export interface ShiftType {
  id: number;
  name: string;
  startTime: string; 
  endTime: string;
}

export interface Shift {
  shiftId: number;
  unit: Unit;
  shiftType: ShiftType;
}

export interface ShiftRequest {
  requestId: number;
  requester: Staff;
  requestedWith: Staff;
  fromShift: Shift;
  toShift: Shift;
  status: 'WAITING' | 'PENDING' | 'DECLINED' | 'APPROVED';
  requestDate: string; 
}
