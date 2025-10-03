import api from './client';
import { ShiftRequest } from '../types';

export const shiftRequestService = {
  // Get waiting shift requests (staff accepted, waiting for admin approval)
  getWaitingRequests: async (): Promise<ShiftRequest[]> => {
    console.log('Fetching waiting requests...');
    console.log('Base URL:', api.defaults.baseURL);
    const response = await api.get('/api/shift-requests?status=WAITING');
    console.log('Full Response:', response);
    console.log('Response Data:', response.data);
    console.log('Data Length:', response.data.length);
    return response.data;
  },

  getPendingRequests: async (): Promise<ShiftRequest[]> => {
    const response = await api.get('/api/shift-requests?status=PENDING');
    return response.data;
  },

  getRequestsByStatus: async (status: string): Promise<ShiftRequest[]> => {
    const response = await api.get(`/api/shift-requests?status=${status}`);
    return response.data;
  },

  approveRequest: async (requestId: number): Promise<ShiftRequest> => {
    const response = await api.put(`/api/shift-requests/${requestId}/approve`);
    return response.data;
  },

  declineRequest: async (requestId: number): Promise<ShiftRequest> => {
    const response = await api.put(`/api/shift-requests/${requestId}/decline`);
    return response.data;
  },

  acceptRequest: async (requestId: number): Promise<ShiftRequest> => {
    const response = await api.put(`/api/shift-requests/${requestId}/accept`);
    return response.data;
  },

  rejectRequest: async (requestId: number): Promise<ShiftRequest> => {
    const response = await api.put(`/api/shift-requests/${requestId}/reject`);
    return response.data;
  },

  getAllRequests: async (): Promise<ShiftRequest[]> => {
    const response = await api.get('/api/shift-requests');
    return response.data;
  },

  getStaffRequests: async (staffId: number): Promise<ShiftRequest[]> => {
    const response = await api.get(`/api/shift-requests/staff/${staffId}`);
    return response.data;
  }
};