// src/pages/Dashboard.tsx (NEW)
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, isAdmin, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {user?.fullName}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">User Information</h2>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <p><strong>Staff ID:</strong> {user?.staffId}</p>
                            <p><strong>Full Name:</strong> {user?.fullName}</p>
                            <p><strong>Role:</strong> {user?.role?.name}</p>
                            <p><strong>Admin Access:</strong> {isAdmin() ? 'Yes' : 'No'}</p>
                        </div>

                        {isAdmin() && (
                            <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 rounded">
                                <p className="text-yellow-800">
                                    🔐 You have admin privileges! Admin panel features will go here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;