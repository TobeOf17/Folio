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
            const statsData = await getDashboardStats();
            setStats(statsData);

            const rolesData = await getAllRoles();
            setRoles(rolesData);

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load admin data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-text">Loading admin data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert-error">
                <strong>Error:</strong> {error}
                <button onClick={loadAdminData} className="btn-danger btn-small ml-4">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="content-wrapper">
            <h2 className="page-title">Admin Panel</h2>

            {/* Dashboard Stats */}
            {stats && (
                <div className="card">
                    <h3 className="section-title">System Statistics</h3>
                    <div className="stats-grid">
                        <div className="stat-card-blue">
                            <div className="stat-number-blue">{stats.totalUsers}</div>
                            <div className="stat-label-blue">Total Users</div>
                        </div>
                        <div className="stat-card-green">
                            <div className="stat-number-green">{stats.activeUsers}</div>
                            <div className="stat-label-green">Active Users</div>
                        </div>
                        <div className="stat-card-purple">
                            <div className="stat-number-purple">{stats.totalRoles}</div>
                            <div className="stat-label-purple">Total Roles</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Roles Management */}
            <div className="card">
                <h3 className="section-title">Role Management</h3>
                <p className="text-sm text-gray-500 mb-4">Manage system roles and permissions</p>

                <div className="space-y-3">
                    {roles.map((role) => (
                        <div key={role.roleId} className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                            <div>
                                <p className="font-medium text-gray-900">{role.name}</p>
                                {role.description && (
                                    <p className="text-sm text-gray-500">{role.description}</p>
                                )}
                            </div>
                            <div className="text-sm text-gray-500">ID: {role.roleId}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;