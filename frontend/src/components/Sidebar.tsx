// src/components/Sidebar.tsx
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
    currentPage: string;
    onNavigate: (page: string) => void;
    isOpen: boolean;
    onClose: () => void;
    isAdmin: boolean;
}

const Sidebar = ({ currentPage, onNavigate, isOpen, onClose, isAdmin }: SidebarProps) => {
    const { user } = useAuth();

    const navigationItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: (
                <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
                </svg>
            ),
            adminOnly: false
        },
        {
            id: 'attendance-history',
            label: 'Attendance History',
            icon: (
                <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
            adminOnly: false
        }
    ];

    const adminItems = [
        {
            id: 'admin',
            label: 'Admin Dashboard',
            icon: (
                <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            adminOnly: true
        },
        {
            id: 'staff-management',
            label: 'Staff Management',
            icon: (
                <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
            ),
            adminOnly: true
        }
    ];

    const allItems = [...navigationItems, ...(isAdmin ? adminItems : [])];

    const handleItemClick = (pageId: string) => {
        onNavigate(pageId);
        onClose(); // Close sidebar on mobile after navigation
    };

    return (
        <>
            {/* Sidebar Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={onClose}
                />
            )}
            
            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
                {/* User Info Section */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="nav-user-avatar">
                            {user?.fullName?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="nav-user-name truncate">
                                {user?.fullName || 'User'}
                            </div>
                            <div className="nav-user-role">
                                {user?.role?.name || 'Staff'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="sidebar-nav">
                    <div className="space-y-1">
                        {allItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleItemClick(item.id)}
                                className={`sidebar-item ${
                                    currentPage === item.id ? 'sidebar-item-active' : ''
                                }`}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="text-[14px] font-medium text-gray-600 uppercase tracking-wider mb-3 px-4">
                            Quick Actions
                        </div>
                        <div className="space-y-1">
                            <button className="sidebar-item">
                                <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Clock In/Out
                            </button>
                            <button className="sidebar-item">
                                <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9l2 2 4-4" />
                                </svg>
                                Request Leave
                            </button>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
