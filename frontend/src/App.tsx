// src/App.tsx (UPDATED)
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

const AppContent = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="App">
            {isAuthenticated ? <Dashboard /> : <LoginPage />}
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