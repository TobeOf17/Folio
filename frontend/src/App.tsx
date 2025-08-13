import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

type PageType = 'dashboard' | 'admin';

const AppContent = () => {
    const { isAuthenticated } = useAuth();
    const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

    if (!isAuthenticated) {
        return <LoginPage />;
    }

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'admin':
                return (
                    <ProtectedRoute requireAdmin={true}>
                        <AdminPanel />
                    </ProtectedRoute>
                );
            case 'dashboard':
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="page-container">
            <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
            <main className="main-content">
                {renderCurrentPage()}
            </main>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;