import { useState } from 'react';
import { authService, Staff, LoginRequest } from './services/auth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    const [user, setUser] = useState<Staff | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (credentials: LoginRequest) => {
        setLoading(true);
        try {
            const response = await authService.login(credentials);
            setUser(response.staff);
        } catch (error) {
            throw error; // Let Login component handle the error
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            setUser(null); // Clear user anyway
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return user ? (
        <Dashboard user={user} onLogout={handleLogout} />
    ) : (
        <Login onLogin={handleLogin} />
    );
}

export default App;