// src/pages/StaffManagement.tsx
import React, { useState, useEffect } from 'react';

interface Staff {
    staffId: number;
    fullName: string;
    email: string;
    phone: string;
    employeeId: string;
    role: {
        roleId: number;
        name: string;
    };
    unit: {
        unitId: number;
        name: string;
    };
    createdAt: string;
    status: 'active' | 'inactive';
}

interface Role {
    roleId: number;
    name: string;
    description?: string;
}

interface Unit {
    unitId: number;
    name: string;
    description?: string;
}

const StaffManagement = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [staff, setStaff] = useState<Staff[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState<number | ''>('');
    const [selectedUnit, setSelectedUnit] = useState<number | ''>('');
    const [showAddStaffModal, setShowAddStaffModal] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            // TODO: Replace with actual API calls
            // const [staffData, rolesData, unitsData] = await Promise.all([
            //     getStaff(),
            //     getRoles(),
            //     getUnits()
            // ]);
            // setStaff(staffData);
            // setRoles(rolesData);
            // setUnits(unitsData);
            
            // Simulate loading
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Failed to load staff data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredStaff = staff.filter(member => {
        const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             member.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = selectedRole === '' || member.role.roleId === selectedRole;
        const matchesUnit = selectedUnit === '' || member.unit.unitId === selectedUnit;
        
        return matchesSearch && matchesRole && matchesUnit;
    });

    const handleAddStaff = () => {
        setShowAddStaffModal(true);
        // TODO: Implement add staff modal
    };

    const handleEditStaff = (staffId: number) => {
        // TODO: Implement edit staff functionality
        console.log('Edit staff:', staffId);
    };

    const handleDeactivateStaff = (staffId: number) => {
        // TODO: Implement deactivate staff functionality
        console.log('Deactivate staff:', staffId);
    };

    const getStatusBadge = (status: string) => {
        return status === 'active' ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Active
            </span>
        ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                Inactive
            </span>
        );
    };

    if (isLoading) {
        return (
            <div className="content-wrapper">
                <div className="card">
                    <div className="loading-container">
                        <div className="loading-text">Loading staff data...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="content-wrapper">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="page-title">👥 Staff Management</h2>
                    <p className="page-subtitle">Manage staff members and their information</p>
                </div>
                <button
                    onClick={handleAddStaff}
                    className="btn btn-primary"
                >
                    ➕ Add New Staff
                </button>
            </div>

            {/* Filters */}
            <div className="card mb-6">
                <h3 className="card-header">Search & Filter</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-group">
                        <label className="label">Search Staff</label>
                        <input
                            type="text"
                            placeholder="Search by name, email, or employee ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 placeholder-gray-400 text-base"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Filter by Role</label>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value === '' ? '' : parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-base"
                        >
                            <option value="">All Roles</option>
                            {roles.map(role => (
                                <option key={role.roleId} value={role.roleId}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label">Filter by Unit</label>
                        <select
                            value={selectedUnit}
                            onChange={(e) => setSelectedUnit(e.target.value === '' ? '' : parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-base"
                        >
                            <option value="">All Units</option>
                            {units.map(unit => (
                                <option key={unit.unitId} value={unit.unitId}>
                                    {unit.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Staff List */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="card-header mb-0">Staff Members</h3>
                    <div className="text-sm text-gray-600">
                        Showing {filteredStaff.length} of {staff.length} staff members
                    </div>
                </div>

                {filteredStaff.length > 0 ? (
                    <div className="space-y-4">
                        {filteredStaff.map((member) => (
                            <div key={member.staffId} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <h4 className="text-lg font-semibold text-gray-900 mr-3">
                                                {member.fullName}
                                            </h4>
                                            {getStatusBadge(member.status)}
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">Employee ID:</span>
                                                <div className="font-medium text-gray-900">{member.employeeId}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Email:</span>
                                                <div className="font-medium text-blue-600">{member.email}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Phone:</span>
                                                <div className="font-medium text-gray-900">{member.phone}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Join Date:</span>
                                                <div className="font-medium text-gray-900">
                                                    {new Date(member.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center mt-3 space-x-4">
                                            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                📋 {member.role.name}
                                            </div>
                                            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                                🏢 {member.unit.name}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 ml-4">
                                        <button
                                            onClick={() => handleEditStaff(member.staffId)}
                                            className="btn btn-secondary btn-small"
                                        >
                                            ✏️ Edit
                                        </button>
                                        {member.status === 'active' && (
                                            <button
                                                onClick={() => handleDeactivateStaff(member.staffId)}
                                                className="btn btn-danger btn-small"
                                            >
                                                🚫 Deactivate
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-500 mb-4 text-4xl">👥</div>
                        <div className="text-gray-600 text-lg font-semibold mb-2">
                            {staff.length === 0 ? 'No staff members found' : 'No staff match your filters'}
                        </div>
                        <div className="text-gray-500 mb-6">
                            {staff.length === 0 
                                ? 'Start by adding your first staff member to the system.'
                                : 'Try adjusting your search criteria or filters.'
                            }
                        </div>
                        {staff.length === 0 && (
                            <button
                                onClick={handleAddStaff}
                                className="btn btn-primary"
                            >
                                ➕ Add First Staff Member
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Summary Stats */}
            {staff.length > 0 && (
                <div className="card mt-6">
                    <h3 className="card-header">Staff Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                            <div className="text-2xl font-bold text-blue-600">{staff.length}</div>
                            <div className="text-sm text-blue-800">Total Staff</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                            <div className="text-2xl font-bold text-green-600">
                                {staff.filter(s => s.status === 'active').length}
                            </div>
                            <div className="text-sm text-green-800">Active</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-xl">
                            <div className="text-2xl font-bold text-red-600">
                                {staff.filter(s => s.status === 'inactive').length}
                            </div>
                            <div className="text-sm text-red-800">Inactive</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-xl">
                            <div className="text-2xl font-bold text-purple-600">{roles.length}</div>
                            <div className="text-sm text-purple-800">Total Roles</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffManagement;
