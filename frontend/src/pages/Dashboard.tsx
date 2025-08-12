// src/pages/Dashboard.tsx (UPDATED - Remove nav, simplify)
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, isAdmin } = useAuth();

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        User Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Staff ID</label>
                            <p className="mt-1 text-sm text-gray-900">{user?.staffId}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <p className="mt-1 text-sm text-gray-900">{user?.fullName}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <p className="mt-1 text-sm text-gray-900">{user?.role?.name}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Admin Access</label>
                            <p className="mt-1 text-sm text-gray-900">{isAdmin() ? 'Yes' : 'No'}</p>
                        </div>
                    </div>

                    {isAdmin() && (
                        <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 rounded">
                            <p className="text-yellow-800">
                                🔐 You have admin privileges! Use the Admin Panel to manage system settings.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;