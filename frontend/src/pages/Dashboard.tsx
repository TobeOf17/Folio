import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { getGreeting, formatDate, formatTime } from '../utils/helpers';

interface DashboardStats {
  totalStaff: number;
  totalRoles: number;
  totalUnits: number;
}

const Dashboard: React.FC = () => {
  const { user, logout, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState<'signed-out' | 'signed-in'>('signed-out');

  useEffect(() => {
    if (authLoading) return; // wait until AuthContext finishes checking
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    loadDashboardData();
  }, [authLoading, user, navigate]);

  const loadDashboardData = async () => {
    try {
      setDataLoading(true);
      if (isAdmin()) {
        const response = await api.get('/admin/dashboard');
        setStats(response.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      await api.post('/attendance/sign-in');
      setAttendanceStatus('signed-in');
      alert('Signed in successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to sign in');
    }
  };

  const handleSignOut = async () => {
    try {
      await api.post('/attendance/sign-out');
      setAttendanceStatus('signed-out');
      alert('Signed out successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to sign out');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { 
      label: 'Dashboard', 
      icon: '📊', 
      onClick: () => {}, 
      active: true 
    },
    { 
      label: 'My Attendance', 
      icon: '📅', 
      onClick: () => alert('Coming soon'), 
      disabled: false 
    },
    ...(isAdmin() ? [
      { 
        label: 'Manage Staff', 
        icon: '👥', 
        onClick: () => alert('Coming soon'), 
        disabled: false 
      },
      { 
        label: 'Manage Roles', 
        icon: '🏷️', 
        onClick: () => alert('Coming soon'), 
        disabled: false 
      },
      { 
        label: 'Manage Units', 
        icon: '🏢', 
        onClick: () => alert('Coming soon'), 
        disabled: false 
      },
      { 
        label: 'Reports', 
        icon: '📈', 
        onClick: () => alert('Coming soon'), 
        disabled: false 
      }
    ] : []),
    { 
      label: 'Shift Management', 
      icon: '🔄', 
      onClick: () => alert('Coming soon - Shift Management'), 
      disabled: true,
      badge: 'Soon'
    },
    { 
      label: 'Shift Swapping', 
      icon: '↔️', 
      onClick: () => alert('Coming soon - Shift Swapping'), 
      disabled: true,
      badge: 'Soon'
    },
  ];
    if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64 bg-white border-r border-gray-200`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
            <span className="text-xl font-black text-gray-900">Folio</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.fullName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.role?.name}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.active
                        ? 'bg-brand text-white'
                        : item.disabled
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {formatDate(new Date())} • {formatTime(new Date())}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900">
              {getGreeting()}, {user?.fullName?.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back to your attendance dashboard
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleSignIn}
                disabled={attendanceStatus === 'signed-in'}
                className="p-6 bg-white border-2 border-green-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                    ✅
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Sign In</h3>
                    <p className="text-sm text-gray-600">Clock in for today</p>
                  </div>
                </div>
              </button>

              <button
                onClick={handleSignOut}
                disabled={attendanceStatus === 'signed-out'}
                className="p-6 bg-white border-2 border-red-200 rounded-xl hover:border-red-300 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
                    🚪
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Sign Out</h3>
                    <p className="text-sm text-gray-600">Clock out for today</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Admin Stats */}
          {isAdmin() && stats && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">System Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-white border border-gray-200 rounded-xl">
                  <div className="text-3xl font-black text-brand mb-2">
                    {stats.totalStaff}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Total Staff
                  </div>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-xl">
                  <div className="text-3xl font-black text-brand mb-2">
                    {stats.totalRoles}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Roles
                  </div>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-xl">
                  <div className="text-3xl font-black text-brand mb-2">
                    {stats.totalUnits}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Units/Departments
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Coming Soon Features */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'My Attendance History', icon: '📊' },
                { title: 'Attendance Summary', icon: '📈' },
                { title: 'Shift Management', icon: '🔄' },
                { title: 'Shift Swapping', icon: '↔️' },
                { title: 'Leave Requests', icon: '🏖️' },
                { title: 'Team Calendar', icon: '📅' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 border border-gray-200 rounded-xl opacity-60"
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="text-sm font-medium text-gray-700">
                    {feature.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </div>
  );
};

export default Dashboard;