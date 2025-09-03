// src/components/Navbar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
    onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
    const { user, logout } = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClockIn = () => {
        // Add your clock in logic here
        console.log('Clock in clicked');
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="modern-navbar">
            <div className="navbar-container">
                {/* Left Section */}
                <div className="navbar-left">
                    <button
                        className="mobile-menu-toggle"
                        onClick={onToggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>

                    <div className="brand-section">
                        <div className="brand-logo">
                            <span className="logo-icon">F</span>
                        </div>
                        <span className="brand-name">Folio</span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="navbar-right">
                    {/* Clock In Button */}
                    <button
                        className="clock-in-button"
                        onClick={handleClockIn}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>Clock In</span>
                    </button>

                    {/* User Profile Dropdown */}
                    <div className="user-dropdown-container" ref={dropdownRef}>
                        <button
                            className="user-profile-trigger"
                            onClick={toggleUserMenu}
                        >
                            <div className="user-avatar">
                                {user?.fullName?.charAt(0) || 'U'}
                            </div>
                            <div className="user-details">
                                <div className="user-name">
                                    {user?.fullName || 'User'}
                                </div>
                                <div className="user-role">
                                    {user?.role?.name || 'Staff'}
                                </div>
                            </div>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`dropdown-arrow ${isUserMenuOpen ? 'rotated' : ''}`}
                            >
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isUserMenuOpen && (
                            <div className="user-dropdown-menu">
                                <div className="dropdown-header">
                                    <div className="dropdown-avatar">
                                        {user?.fullName?.charAt(0) || 'U'}
                                    </div>
                                    <div className="dropdown-user-info">
                                        <div className="dropdown-name">
                                            {user?.fullName || 'User'}
                                        </div>
                                        <div className="dropdown-email">
                                            {user?.email || 'user@example.com'}
                                        </div>
                                    </div>
                                </div>

                                <div className="dropdown-divider"></div>

                                <div className="dropdown-items">
                                    <button className="dropdown-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                        <span>Profile Settings</span>
                                    </button>

                                    <button className="dropdown-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                                            <path d="M12 1v6m0 6v6" stroke="currentColor" strokeWidth="2"/>
                                            <path d="M21 12h-6m-6 0H3" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                        <span>Preferences</span>
                                    </button>

                                    <button className="dropdown-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                        <span>Time Tracking</span>
                                    </button>
                                </div>

                                <div className="dropdown-divider"></div>

                                <button className="dropdown-item logout-item" onClick={logout}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile-only logout button */}
                    <button
                        onClick={logout}
                        className="mobile-logout-button"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;