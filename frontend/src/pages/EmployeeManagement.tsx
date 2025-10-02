import { useEffect, useState } from 'react';
import { Users, Search, Filter, Download, Plus, Mail, Phone, Calendar, ChevronRight, Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Staff } from '../types';
import api from '../api/client';

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [staffData, setStaffData] = useState<Staff | null>(null);
  const [employees, setEmployees] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  
  const adminName = staffData?.fullName || "Loading...";
  const department = staffData?.unit?.name || "Loading...";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffId = sessionStorage.getItem('staffId');
        
        if (!staffId) {
          console.error('No staff ID found');
          return;
        }

        // Fetch admin data
        const staffResponse = await api.get(`api/staff/${staffId}`);
        setStaffData(staffResponse.data);

        // Fetch employees in the same unit
        if (staffResponse.data?.unit?.unitId) {
          const employeesResponse = await api.get(`api/staff/unit/${staffResponse.data.unit.unitId}`);
          setEmployees(employeesResponse.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Backup mock data for display purposes
  const mockEmployees: Staff[] = [
    {
      staffId: 1,
      fullName: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+234 801 234 5678',
      employeeId: 'EMP001',
      dob: '1990-05-15',
      gender: 'MALE',
      role: { roleId: 1, name: 'Senior Engineer' },
      unit: staffData?.unit || { unitId: 1, name: 'Engineering' },
      company: staffData?.company || { id: 1, name: 'Company', industry: 'Tech', createdAt: '2020-01-01' },
      createdAt: '2022-03-15',
      admin: false
    },
    {
      staffId: 2,
      fullName: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      phone: '+234 802 345 6789',
      employeeId: 'EMP002',
      dob: '1988-08-22',
      gender: 'FEMALE',
      role: { roleId: 2, name: 'Sales Manager' },
      unit: staffData?.unit || { unitId: 1, name: 'Engineering' },
      company: staffData?.company || { id: 1, name: 'Company', industry: 'Tech', createdAt: '2020-01-01' },
      createdAt: '2021-08-22',
      admin: false
    },
    {
      staffId: 3,
      fullName: 'Mike Davis',
      email: 'mike.davis@company.com',
      phone: '+234 803 456 7890',
      employeeId: 'EMP003',
      dob: '1992-01-10',
      gender: 'MALE',
      role: { roleId: 3, name: 'Marketing Lead' },
      unit: staffData?.unit || { unitId: 1, name: 'Engineering' },
      company: staffData?.company || { id: 1, name: 'Company', industry: 'Tech', createdAt: '2020-01-01' },
      createdAt: '2023-01-10',
      admin: false
    },
    {
      staffId: 4,
      fullName: 'Emily Chen',
      email: 'emily.chen@company.com',
      phone: '+234 804 567 8901',
      employeeId: 'EMP004',
      dob: '1991-11-05',
      gender: 'FEMALE',
      role: { roleId: 4, name: 'Support Specialist' },
      unit: staffData?.unit || { unitId: 1, name: 'Engineering' },
      company: staffData?.company || { id: 1, name: 'Company', industry: 'Tech', createdAt: '2020-01-01' },
      createdAt: '2022-11-05',
      admin: false
    },
    {
      staffId: 5,
      fullName: 'Tom Wilson',
      email: 'tom.wilson@company.com',
      phone: '+234 805 678 9012',
      employeeId: 'EMP005',
      dob: '1989-05-18',
      gender: 'MALE',
      role: { roleId: 5, name: 'Lead Engineer' },
      unit: staffData?.unit || { unitId: 1, name: 'Engineering' },
      company: staffData?.company || { id: 1, name: 'Company', industry: 'Tech', createdAt: '2020-01-01' },
      createdAt: '2020-05-18',
      admin: false
    },
    {
      staffId: 6,
      fullName: 'Lisa Anderson',
      email: 'lisa.a@company.com',
      phone: '+234 806 789 0123',
      employeeId: 'EMP006',
      dob: '1993-02-28',
      gender: 'FEMALE',
      role: { roleId: 6, name: 'Sales Executive' },
      unit: staffData?.unit || { unitId: 1, name: 'Engineering' },
      company: staffData?.company || { id: 1, name: 'Company', industry: 'Tech', createdAt: '2020-01-01' },
      createdAt: '2023-02-28',
      admin: false
    },
    {
      staffId: 7,
      fullName: 'David Brown',
      email: 'david.b@company.com',
      phone: '+234 807 890 1234',
      employeeId: 'EMP007',
      dob: '1990-07-14',
      gender: 'MALE',
      role: { roleId: 7, name: 'Product Designer' },
      unit: staffData?.unit || { unitId: 1, name: 'Engineering' },
      company: staffData?.company || { id: 1, name: 'Company', industry: 'Tech', createdAt: '2020-01-01' },
      createdAt: '2022-07-14',
      admin: false
    },
    {
      staffId: 8,
      fullName: 'Rachel Green',
      email: 'rachel.g@company.com',
      phone: '+234 808 901 2345',
      employeeId: 'EMP008',
      dob: '1987-04-01',
      gender: 'FEMALE',
      role: { roleId: 8, name: 'HR Manager' },
      unit: staffData?.unit || { unitId: 1, name: 'Engineering' },
      company: staffData?.company || { id: 1, name: 'Company', industry: 'Tech', createdAt: '2020-01-01' },
      createdAt: '2021-04-01',
      admin: false
    }
  ];

  // Use real data if available, otherwise use mock data
  const displayEmployees = employees.length > 0 ? employees : mockEmployees;

  const filteredEmployees = displayEmployees.filter(emp => {
    const fullName = emp.fullName || '';
    const email = emp.email || '';
    const roleName = emp.role?.name || '';
    
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         roleName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || roleName === filterRole;
    return matchesSearch && matchesFilter;
  });

  const roles = ['all', ...new Set(displayEmployees.map(e => e.role?.name).filter(Boolean) as string[])];

  const stats = [
    { label: 'Total Employees', value: displayEmployees.length.toString(), color: 'bg-purple-50 text-purple-600' },
    { label: 'Active', value: displayEmployees.length.toString(), color: 'bg-green-50 text-green-600' },
    { label: 'Admins', value: displayEmployees.filter(e => e.admin).length.toString(), color: 'bg-orange-50 text-orange-600' },
    { label: 'Roles', value: roles.filter(r => r !== 'all').length.toString(), color: 'bg-blue-50 text-blue-600' }
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
                  <div className="absolute inset-0 w-8 h-8 bg-purple-700/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
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
            <Users className="w-12 h-12 text-purple-700" />
            <h2 className="text-6xl font-black text-gray-900">Employee <span className="text-purple-700">Management</span></h2>
          </div>
          <p className="mt-2 text-lg text-gray-600">Manage and view all employees in {department}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-gray-180 hover:shadow-md transition-shadow cursor-pointer">
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-4xl font-semibold text-gray-900 mb-1">{stat.value}</p>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${stat.color}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-600 transition-colors"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-600 transition-colors appearance-none bg-white cursor-pointer"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'All Roles' : role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-900 hover:border-purple-600 hover:shadow-md transition-all">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 hover:shadow-lg transition-all">
              <Plus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredEmployees.length}</span> of <span className="font-semibold text-gray-900">{displayEmployees.length}</span> employees
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Loading employees...</p>
          </div>
        )}

        {/* Employee Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEmployees.map((employee) => {
              const initials = employee.fullName?.split(' ').map(n => n[0]).join('') || '??';
              const roleName = employee.role?.name || 'N/A';
              
              return (
                <div key={employee.staffId} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-purple-100 hover:shadow-lg hover:border-purple-300 transition-all cursor-pointer">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        {initials}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{employee.fullName}</h3>
                        <p className="text-sm font-medium text-purple-600">{roleName}</p>
                        <p className="text-xs text-gray-500 mt-1">{employee.employeeId}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600">
                      Active
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{employee.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>{employee.phone || 'N/A'}</span>
                    </div>
                    {employee.createdAt && (
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>Joined {new Date(employee.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <button className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 hover:bg-purple-50 py-2 rounded-lg transition-colors">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredEmployees.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No employees found</h3>
            <p className="text-sm text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmployeeManagement;