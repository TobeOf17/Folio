import { useEffect, useState } from 'react';
import { Users, Clock, FileText, Settings, Bell, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Staff } from '../types';
import api from '../api/client';

const Dashboard = () => {
const [staffData, setStaffData] = useState<Staff | null>(null);
const adminName = staffData?.fullName || "Loading...";
const role = staffData?.role?.name || "Loading...";
const department = staffData?.unit?.name || "Loading...";

useEffect(() => {
  const fetchStaffData = async () => {
    try {
      const staffId = sessionStorage.getItem('staffId');
      
      if (!staffId) {
        console.error('No staff ID found');
        return;
      }

      const response = await api.get(`api/staff/${staffId}`);
      setStaffData(response.data);
    } catch (err) {
      console.error('Error fetching staff data:', err);
    }
  };

  fetchStaffData();
}, []);

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

  const shiftSwapRequests = [
    { from: 'John Smith', to: 'Mike Davis', date: 'Oct 5', fromShift: 'Morning', toShift: 'Afternoon', reason: 'Doctor appointment' },
    { from: 'Sarah Johnson', to: 'Emily Chen', date: 'Oct 7', fromShift: 'Afternoon', toShift: 'Morning', reason: 'Personal matter' },
    { from: 'Tom Wilson', to: 'Lisa Anderson', date: 'Oct 10', fromShift: 'Morning', toShift: 'Night', reason: 'Family event' }
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

                                {/* Subtle glow effect */}
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

          {/* Pending Shift Swap Requests */}
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Shift Swap Requests</h3>
              <p className="text-sm text-gray-500 mt-1">Review and approve shift changes</p>
            </div>
            <div className="space-y-4">
              {shiftSwapRequests.map((request, i) => (
                <div key={i} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-red-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{request.from} → {request.to}</p>
                      <p className="text-sm text-gray-500 mt-1">{request.date} · {request.fromShift} to {request.toShift}</p>
                      <p className="text-xs text-gray-400 mt-1">{request.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <button className="flex-1 text-sm font-semibold text-white bg-brand hover:bg-red-600 py-2 px-4 rounded-lg transition-colors">
                      Approve
                    </button>
                    <button className="flex-1 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;