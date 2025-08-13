// src/components/Navbar.tsx (CLEAN VERSION)
import React from 'react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
    currentPage: 'dashboard' | 'admin';
    onNavigate: (page: 'dashboard' | 'admin') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
    const { user, isAdmin, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-content">
                    <div className="flex items-center space-x-8">
                        <h1 className="nav-brand">Admin Portal</h1>

                        <div className="nav-links">
                            <button
                                onClick={() => onNavigate('dashboard')}
                                className={currentPage === 'dashboard' ? 'nav-link-active' : 'nav-link-inactive'}
                            >
                                Dashboard
                            </button>

                            {isAdmin() && (
                                <button
                                    onClick={() => onNavigate('admin')}
                                    className={currentPage === 'admin' ? 'nav-link-active' : 'nav-link-inactive'}
                                >
                                    Admin Panel
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="nav-user-info">
                            <div className="nav-user-name">{user?.fullName}</div>
                            <div className="nav-user-role">{user?.role?.name}</div>
                        </div>
                        <button onClick={logout} className="btn-primary btn-small">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;