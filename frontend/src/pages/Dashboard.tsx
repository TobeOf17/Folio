import React, { useState } from 'react';
import { Users, Clock, FileText, Settings, Bell, ChevronRight, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const adminName = "Sarah Chen";

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

  const departments = [
    { name: 'Engineering', present: 45, total: 50, rate: 90 },
    { name: 'Sales', present: 32, total: 35, rate: 91 },
    { name: 'Marketing', present: 18, total: 20, rate: 90 },
    { name: 'Support', present: 28, total: 30, rate: 93 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-black text-gray-900">Folio</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-sm font-semibold text-gray-900">Dashboard</a>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Employees</a>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Attendance</a>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Reports</a>
              </nav>
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
          <h2 className="text-3xl font-black text-gray-900">Good morning, {adminName.split(' ')[0]}</h2>
          <p className="mt-1 text-gray-600">Here's what's happening with your team today</p>
        </div>

        {/* Stats Grid - Airbnb style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-4xl font-semibold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.subtext}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <button className="text-sm font-medium text-gray-900 hover:underline flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 text-sm font-semibold">
                        {activity.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{activity.name}</p>
                        <p className="text-sm text-gray-500">{activity.action} · {activity.dept}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Status */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">Department Status</h3>
              <p className="text-sm text-gray-500 mt-1">Today's attendance by team</p>
            </div>
            <div className="space-y-6">
              {departments.map((dept, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">{dept.name}</span>
                    <span className="text-sm text-gray-600">{dept.present}/{dept.total}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-gray-900 h-2 rounded-full" 
                      style={{ width: `${dept.rate}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{dept.rate}% present</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Users, label: 'Add Employee' },
              { icon: FileText, label: 'Generate Report' },
              { icon: Clock, label: 'View Attendance' },
              { icon: Settings, label: 'Settings' }
            ].map((action, i) => (
              <button key={i} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
                <action.icon className="w-6 h-6 text-gray-700 mx-auto mb-3" />
                <span className="text-sm font-medium text-gray-900">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;