import React, { useState } from 'react';
import { Home, Users, Clock, FileText, Settings, Bell, Menu, X, TrendingUp, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminName = "Sarah Chen";

  const stats = [
    { label: 'Total Employees', value: '248', change: '+12 this month', icon: Users, trend: 'up' },
    { label: 'Present Today', value: '231', change: '93% attendance', icon: Clock, trend: 'up' },
    { label: 'On Leave', value: '12', change: '5 pending requests', icon: FileText, trend: 'neutral' },
    { label: 'Late Arrivals', value: '5', change: 'Down from 8', icon: AlertCircle, trend: 'down' }
  ];

  const recentActivity = [
    { name: 'John Smith', action: 'Clocked in', time: '09:02 AM', status: 'success' },
    { name: 'Sarah Johnson', action: 'Clocked out', time: '05:45 PM', status: 'success' },
    { name: 'Mike Davis', action: 'Late arrival', time: '09:30 AM', status: 'warning' },
    { name: 'Emily Chen', action: 'Clocked in', time: '08:55 AM', status: 'success' },
    { name: 'Tom Wilson', action: 'Leave approved', time: '08:30 AM', status: 'info' }
  ];

  const departments = [
    { name: 'Engineering', present: 45, total: 50, rate: 90 },
    { name: 'Sales', present: 32, total: 35, rate: 91 },
    { name: 'Marketing', present: 18, total: 20, rate: 90 },
    { name: 'Support', present: 28, total: 30, rate: 93 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r-2 border-red-100 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between p-6 border-b-2 border-red-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg shadow-red-200">
              F
            </div>
            <span className="text-2xl font-black text-gray-900">Folio</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-red-50 to-red-50/50 border-2 border-red-200 rounded-xl text-red-600 font-semibold shadow-sm">
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-2 hover:border-red-100 rounded-xl transition-all font-medium">
            <Users className="w-5 h-5" />
            <span>Employees</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-2 hover:border-red-100 rounded-xl transition-all font-medium">
            <Clock className="w-5 h-5" />
            <span>Attendance</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-2 hover:border-red-100 rounded-xl transition-all font-medium">
            <FileText className="w-5 h-5" />
            <span>Reports</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-2 hover:border-red-100 rounded-xl transition-all font-medium">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-gradient-to-br from-red-50 to-white border-2 border-red-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm font-bold text-gray-900 mb-1">Need Help?</p>
            <p className="text-xs text-gray-600 mb-3">Check our documentation</p>
            <button className="w-full bg-red-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-red-600 transition-colors">
              View Docs
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b-2 border-red-100 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600">
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-black text-gray-900">{adminName}'s Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back! Here's what's happening today.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2.5 text-gray-600 hover:bg-red-50 rounded-xl transition-colors border-2 border-transparent hover:border-red-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>
              <div className="flex items-center space-x-3 bg-red-50 border-2 border-red-200 rounded-xl px-4 py-2">
                <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                  {adminName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-bold text-gray-900">{adminName}</div>
                  <div className="text-xs text-gray-500">Administrator</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border-2 border-red-100 p-6 hover:shadow-xl hover:-translate-y-1 hover:border-red-300 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${
                    i === 0 ? 'bg-blue-50 text-blue-600' :
                    i === 1 ? 'bg-green-50 text-green-600' :
                    i === 2 ? 'bg-yellow-50 text-yellow-600' :
                    'bg-red-50 text-red-600'
                  } rounded-xl flex items-center justify-center shadow-sm`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900 mb-2">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-red-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-900">Recent Activity</h2>
                <button className="text-sm text-red-500 font-bold hover:text-red-600 hover:underline">View All →</button>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-red-50 rounded-xl border-2 border-transparent hover:border-red-200 transition-all">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 bg-white border-2 border-red-200 rounded-xl flex items-center justify-center text-gray-700 font-bold shadow-sm">
                        {activity.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{activity.name}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700 mb-1">{activity.time}</p>
                      <span className={`inline-block px-3 py-1 text-xs font-bold rounded-lg border-2 ${
                        activity.status === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 
                        activity.status === 'warning' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {activity.status === 'success' ? 'On Time' : activity.status === 'warning' ? 'Late' : 'Approved'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Attendance */}
            <div className="bg-white rounded-2xl border-2 border-red-100 p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-black text-gray-900 mb-6">Department Status</h2>
              <div className="space-y-5">
                {departments.map((dept, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl border-2 border-transparent hover:border-red-200 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-gray-900">{dept.name}</span>
                      <span className="text-sm font-bold text-gray-700">{dept.present}/{dept.total}</span>
                    </div>
                    <div className="w-full bg-white border-2 border-red-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all shadow-sm" 
                        style={{ width: `${dept.rate}%` }}
                      ></div>
                    </div>
                    <p className="text-xs font-semibold text-gray-600 mt-2">{dept.rate}% present</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-gradient-to-br from-red-50 to-white rounded-2xl border-2 border-red-200 p-6 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 mb-5">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Users, label: 'Add Employee', color: 'from-blue-500 to-blue-600' },
                { icon: FileText, label: 'Generate Report', color: 'from-green-500 to-green-600' },
                { icon: Clock, label: 'View Attendance', color: 'from-yellow-500 to-yellow-600' },
                { icon: Settings, label: 'Settings', color: 'from-red-500 to-red-600' }
              ].map((action, i) => (
                <button key={i} className="flex flex-col items-center justify-center p-5 bg-white border-2 border-red-200 rounded-xl hover:shadow-lg hover:-translate-y-1 hover:border-red-300 transition-all">
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-3 shadow-md`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-900">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;