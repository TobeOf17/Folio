import { useEffect, useState } from 'react';
import { Users, Clock, FileText, Settings, Bell, ChevronRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Staff, ShiftRequest } from '../types';
import api from '../api/client';
import { shiftRequestService } from '../api/shiftRequestService';

const Dashboard = () => {
  const [staffData, setStaffData] = useState<Staff | null>(null);
  const [shiftRequests, setShiftRequests] = useState<ShiftRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const adminName = staffData?.fullName || "Loading...";
  const role = staffData?.role?.name || "Loading...";
  const department = staffData?.unit?.name || "Loading...";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch staff data
        const staffId = sessionStorage.getItem('staffId');
        if (staffId) {
          const response = await api.get(`api/staff/${staffId}`);
          setStaffData(response.data);
        }

        // Fetch waiting shift requests
        const requests = await shiftRequestService.getWaitingRequests();
        console.log('Shift Requests:', requests);
        setShiftRequests(requests);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (requestId: number) => {
    try {
      setActionLoading(requestId);
      await shiftRequestService.approveRequest(requestId);
      
      // Refresh the list
      const updatedRequests = await shiftRequestService.getWaitingRequests();
      setShiftRequests(updatedRequests);
    } catch (err) {
      console.error('Error approving request:', err);
      alert('Failed to approve request. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecline = async (requestId: number) => {
    try {
      setActionLoading(requestId);
      await shiftRequestService.declineRequest(requestId);
      
      // Refresh the list
      const updatedRequests = await shiftRequestService.getWaitingRequests();
      setShiftRequests(updatedRequests);
    } catch (err) {
      console.error('Error declining request:', err);
      alert('Failed to decline request. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const stats = [
    { label: 'Total Employees', value: '248', subtext: '+12 this month' },
    { label: 'Present Today', value: '231', subtext: '93% attendance' },
    { label: 'On Leave', value: '12', subtext: '5 pending requests' },
    { label: 'Late Arrivals', value: '5', subtext: 'Down from yesterday' }
  ];

  const recentActivity = [
    { name: 'John Smith', action: 'Clocked in', time: '09:02 AM', dept: 'Engineering' },
    { name: 'Sarah Johnson', action: 'Clocked out', time: '05:45 PM', dept: 'Sales' },
    { name: 'Mike Davis', action: 'Late arrival', time: '09:30 AM', dept: 'Marketing' },
    { name: 'Emily Chen', action: 'Clocked in', time: '08:55 AM', dept: 'Support' },
    { name: 'Tom Wilson', action: 'Leave approved', time: '08:30 AM', dept: 'Engineering' },
    { name: 'Lisa Anderson', action: 'Clocked in', time: '08:45 AM', dept: 'Sales' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-50 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
                aria-label="Folio Home"
              >
                <div className="relative">
                  <div className="absolute inset-0 w-8 h-8 bg-brand/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                </div>
                <span className="text-xl font-black text-gray-900 tracking-tight">
                  Folio
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {adminName.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-900">{adminName}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-6xl font-black text-gray-900">Good morning, <span className="text-brand">{adminName.split(' ')[0]}</span></h2>
            <svg className="w-12 h-12 text-brand animate-spin" style={{ animationDuration: '8s' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
            </svg>
          </div>
          <p className="mt-2 text-lg text-gray-600">{role} in {department} </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-gray-180 hover:shadow-md transition-shadow cursor-pointer">
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-4xl font-semibold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-brand font-medium">{stat.subtext}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/employees">
            <button className="w-full bg-white border-3 border-black-200 rounded-xl p-6 hover:shadow-red-100 hover:shadow-lg hover:border-brand transition-all text-center">
              <Users className="w-6 h-6 text-gray-700 mx-auto mb-3" />
              <span className="text-sm font-semibold text-gray-900">Employee Management</span>
            </button>
          </Link>
          
          <button className="bg-white border-3 border-black-200 rounded-xl p-6 hover:shadow-red-100 hover:shadow-lg hover:border-brand transition-all text-center">
            <FileText className="w-6 h-6 text-gray-700 mx-auto mb-3" />
            <span className="text-sm font-semibold text-gray-900">Generate Report</span>
          </button>
          
          <button className="bg-white border-3 border-black-200 rounded-xl p-6 hover:shadow-red-100 hover:shadow-lg hover:border-brand transition-all text-center">
            <Clock className="w-6 h-6 text-gray-700 mx-auto mb-3" />
            <span className="text-sm font-semibold text-gray-900">Shift Management</span>
          </button>
          
          <button className="bg-white border-3 border-black-200 rounded-xl p-6 hover:shadow-red-100 hover:shadow-lg hover:border-brand transition-all text-center">
            <Settings className="w-6 h-6 text-gray-700 mx-auto mb-3" />
            <span className="text-sm font-semibold text-gray-900">View Attendance</span>
          </button>
        </div>
        <br />
        <br />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <button className="text-sm font-medium text-gray-900 hover:underline flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div key={i} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-red-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 text-xs font-semibold">
                        {activity.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                        <p className="text-xs text-gray-500">{activity.action} · {activity.dept}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shift Swap Requests */}
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Shift Swap Requests</h3>
              <p className="text-xs text-gray-500 mt-1">Staff-approved requests awaiting final approval</p>
            </div>
            
            {loading ? (
              <div className="bg-white border-2 border-gray-200 rounded-xl p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading requests...</p>
              </div>
            ) : shiftRequests.length === 0 ? (
              <div className="bg-white border-2 border-gray-200 rounded-xl p-12 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-20 h-20 text-green-500" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">All Clear!</h4>
                <p className="text-gray-500">No shift swap requests waiting for approval</p>
                <p className="text-xs text-gray-400 mt-2">Requests appear here after staff accept them</p>
              </div>
            ) : (
              <div className="space-y-4">
                {shiftRequests.map((request) => {
                  const requesterName = request.requester?.fullName || 'Unknown';
                  const requestedWithName = request.requestedWith?.fullName || 'Unknown';
                  const fromShiftName = request.fromShift?.shiftType?.name || 'N/A';
                  const fromShiftStart = request.fromShift?.shiftType?.startTime || '';
                  const fromShiftEnd = request.fromShift?.shiftType?.endTime || '';
                  const toShiftName = request.toShift?.shiftType?.name || 'N/A';
                  const toShiftStart = request.toShift?.shiftType?.startTime || '';
                  const toShiftEnd = request.toShift?.shiftType?.endTime || '';
                  const requesterUnit = request.requester?.unit?.name || 'N/A';
                  const requestedWithUnit = request.requestedWith?.unit?.name || 'N/A';

                  return (
                    <div key={request.requestId} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-red-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 text-xs font-semibold">
                              {requesterName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-gray-400">→</span>
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 text-xs font-semibold">
                              {requestedWithName.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <p className="font-semibold text-gray-900">
                            {requesterName} ↔ {requestedWithName}
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Date:</span> {formatDate(request.requestDate)}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Swap:</span> {fromShiftName} {fromShiftStart && fromShiftEnd ? `(${fromShiftStart} - ${fromShiftEnd})` : ''}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">For:</span> {toShiftName} {toShiftStart && toShiftEnd ? `(${toShiftStart} - ${toShiftEnd})` : ''}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {requesterUnit} · {requestedWithUnit}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <button 
                          onClick={() => handleApprove(request.requestId)}
                          disabled={actionLoading === request.requestId}
                          className="flex-1 text-sm font-semibold text-white bg-brand hover:bg-red-600 py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {actionLoading === request.requestId ? 'Processing...' : 'Approve'}
                        </button>
                        <button 
                          onClick={() => handleDecline(request.requestId)}
                          disabled={actionLoading === request.requestId}
                          className="flex-1 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {actionLoading === request.requestId ? 'Processing...' : 'Decline'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;