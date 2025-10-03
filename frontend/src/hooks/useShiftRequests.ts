import { useState, useEffect } from 'react';
import { ShiftRequest } from '../types';
import { shiftRequestService } from '../api/shiftRequestService';

export const useShiftRequests = () => {
  const [shiftRequests, setShiftRequests] = useState<ShiftRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchWaitingRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const requests = await shiftRequestService.getWaitingRequests();
      setShiftRequests(requests);
    } catch (err) {
      console.error('Error fetching shift requests:', err);
      setError('Failed to load shift requests');
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (requestId: number) => {
    try {
      setActionLoading(requestId);
      setError(null);
      await shiftRequestService.approveRequest(requestId);
      await fetchWaitingRequests();
      return { success: true };
    } catch (err) {
      console.error('Error approving request:', err);
      setError('Failed to approve request');
      return { success: false, error: 'Failed to approve request' };
    } finally {
      setActionLoading(null);
    }
  };

  const declineRequest = async (requestId: number) => {
    try {
      setActionLoading(requestId);
      setError(null);
      await shiftRequestService.declineRequest(requestId);
      await fetchWaitingRequests();
      return { success: true };
    } catch (err) {
      console.error('Error declining request:', err);
      setError('Failed to decline request');
      return { success: false, error: 'Failed to decline request' };
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchWaitingRequests();
  }, []);

  return {
    shiftRequests,
    loading,
    error,
    actionLoading,
    approveRequest,
    declineRequest,
    refreshRequests: fetchWaitingRequests
  };
};