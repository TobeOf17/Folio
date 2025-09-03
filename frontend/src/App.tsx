import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import AttendanceHistory from './pages/AttendanceHistory';
import StaffManagement from './pages/StaffManagement';
import ProtectedRoute from './components/ProtectedRoute';

type PageType = 'landing' | 'login' | 'dashboard' | 'admin' | 'attendance-history' | 'staff-management';

const AppContent = () => {
    const { isAuthenticated } = useAuth();
    const [currentPage, setCurrentPage] = useState<PageType>('landing');

    // If not authenticated, show landing or login page based on current page
    if (!isAuthenticated) {
        if (currentPage === 'login') {
            return <LoginPage onBackToLanding={() => setCurrentPage('landing')} />;
        }
        return <LandingPage onNavigateToLogin={() => setCurrentPage('login')} />;
    }

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'admin':
                return (
                    <ProtectedRoute requireAdmin={true}>
                        <AdminPanel />
                    </ProtectedRoute>
                );
            case 'staff-management':
                return (
                    <ProtectedRoute requireAdmin={true}>
                        <StaffManagement />
                    </ProtectedRoute>
                );
            case 'attendance-history':
                return <AttendanceHistory />;
            case 'dashboard':
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="page-container">
            <CalendlyNavbar 
                currentPage={currentPage}
                onNavigate={setCurrentPage}
            />
            <main style={{ paddingTop: '64px' }}>
                <div className="main-container">
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