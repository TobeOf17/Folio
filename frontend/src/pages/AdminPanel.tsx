// src/pages/AdminPanel.tsx
import React, { useState, useEffect } from 'react';
import { getDashboardStats, getAllRoles } from '../services/api';
import { DashboardStats, Role } from '../types/auth';

const AdminPanel = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadAdminData();
    }, []);

    const loadAdminData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Load dashboard stats
            const statsData = await getDashboardStats();
            setStats(statsData);

            // Load roles
            const rolesData = await getAllRoles();
            setRoles(rolesData);

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load admin data');
            console.error('Admin data loading error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading admin data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>Error:</strong> {error}
                <button
                    onClick={loadAdminData}
                    className="ml-4 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Admin Panel</h2>

            {/* Dashboard Stats */}
            {stats && (
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                            System Statistics
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
                                <div className="text-sm text-blue-800">Total Users</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
                                <div className="text-sm text-green-800">Active Users</div>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-purple-600">{stats.totalRoles}</div>
                                <div className="text-sm text-purple-800">Total Roles</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Roles Management */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Role Management
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Manage system roles and permissions
                    </p>
                </div>
                <ul className="divide-y divide-gray-200">
                    {roles.map((role) => (
                        <li key={role.roleId} className="px-4 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{role.name}</p>
                                    {role.description && (
                                        <p className="text-sm text-gray-500">{role.description}</p>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500">
                                    ID: {role.roleId}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;