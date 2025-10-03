import api from './client';
import { ShiftRequest } from '../types';

export const shiftRequestService = {
  // Get waiting shift requests (staff accepted, waiting for admin approval)
  getWaitingRequests: async (): Promise<ShiftRequest[]> => {
    const response = await api.get('/shift-requests?status=WAITING');
    return response.data;
  },

  // Get pending shift requests (waiting for staff to accept)
  getPendingRequests: async (): Promise<ShiftRequest[]> => {
    const response = await api.get('/shift-requests?status=PENDING');
    return response.data;
  },

  // Get shift requests by status
  getRequestsByStatus: async (status: string): Promise<ShiftRequest[]> => {
    const response = await api.get(`/shift-requests?status=${status}`);
    return response.data;
  },

  // Admin approves a shift request (WAITING -> APPROVED)
  approveRequest: async (requestId: number): Promise<ShiftRequest> => {
    const response = await api.put(`/shift-requests/${requestId}/approve`);
    return response.data;
  },

  // Admin declines a shift request (WAITING -> DECLINED)
  declineRequest: async (requestId: number): Promise<ShiftRequest> => {
    const response = await api.put(`/shift-requests/${requestId}/decline`);
    return response.data;
  },

  // Staff accepts a shift request (PENDING -> WAITING)
  acceptRequest: async (requestId: number): Promise<ShiftRequest> => {
    const response = await api.put(`/shift-requests/${requestId}/accept`);
    return response.data;
  },

  // Staff rejects a shift request (PENDING -> DECLINED)
  rejectRequest: async (requestId: number): Promise<ShiftRequest> => {
    const response = await api.put(`/shift-requests/${requestId}/reject`);
    return response.data;
  },

  // Get all shift requests
  getAllRequests: async (): Promise<ShiftRequest[]> => {
    const response = await api.get('/shift-requests');
    return response.data;
  },

  // Get shift requests for a specific staff member
  getStaffRequests: async (staffId: number): Promise<ShiftRequest[]> => {
    const response = await api.get(`/shift-requests/staff/${staffId}`);
    return response.data;
  }
};