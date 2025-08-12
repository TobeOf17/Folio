// src/App.tsx (UPDATED - Add navigation and routing)
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

    const handleNavigate = (page: PageType) => {
        setCurrentPage(page);
    };

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
        <div className="min-h-screen bg-gray-50">
            <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {renderCurrentPage()}
                </div>
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