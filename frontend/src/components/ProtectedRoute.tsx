import React from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           children,
                                                           requireAdmin = false
                                                       }) => {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="access-denied">
                <div className="access-denied-content">
                    <h2 className="access-denied-title">Access Denied</h2>
                    <p className="access-denied-message">Please log in to access this page.</p>
                </div>
            </div>
        );
    }

    if (requireAdmin && !isAdmin()) {
        return (
            <div className="access-denied">
                <div className="access-denied-content">
                    <h2 className="access-denied-title-error">Admin Access Required</h2>
                    <p className="access-denied-message">You don't have permission to access this page.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;