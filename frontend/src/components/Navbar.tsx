// src/components/Navbar.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
    currentPage: 'dashboard' | 'admin';
    onNavigate: (page: 'dashboard' | 'admin') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
    const { user, isAdmin, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-xl font-semibold">Admin Portal</h1>

                        {/* Navigation Links */}
                        <div className="flex space-x-4">
                            <button
                                onClick={() => onNavigate('dashboard')}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    currentPage === 'dashboard'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Dashboard
                            </button>

                            {isAdmin() && (
                                <button
                                    onClick={() => onNavigate('admin')}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        currentPage === 'admin'
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Admin Panel
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700">Welcome, {user?.fullName}</span>
                        <span className="text-sm text-gray-500">({user?.role?.name})</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;