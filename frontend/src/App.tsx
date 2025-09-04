import { AuthProvider, useAuth } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import AttendanceHistory from "./pages/AttendanceHistory";
import StaffManagement from "./pages/StaffManagement";
import Navbar from "./components/Navbar";

/** Route guards */
function RequireAuth({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }: { children: JSX.Element }) {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!user?.isAdmin) return <Navigate to="/dashboard" replace />;
    return children;
}

function AuthedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="page-container">
            <Navbar variant="dashboard" onToggleSidebar={() => {}} />
            <main style={{ paddingTop: "64px" }}>
                <div className="main-container">{children}</div>
            </main>
        </div>
    );
}

function RouterTree() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            {/* Public */}
            <Route
                path="/"
                element={
                    isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />
                }
            />
            <Route
                path="/login"
                element={
                    isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
                }
            />

            {/* Private */}
            <Route
                path="/dashboard"
                element={
                    <RequireAuth>
                        <AuthedLayout>
                            <Dashboard />
                        </AuthedLayout>
                    </RequireAuth>
                }
            />
            <Route
                path="/attendance-history"
                element={
                    <RequireAuth>
                        <AuthedLayout>
                            <AttendanceHistory />
                        </AuthedLayout>
                    </RequireAuth>
                }
            />
            <Route
                path="/staff-management"
                element={
                    <RequireAuth>
                        <AuthedLayout>
                            <StaffManagement />
                        </AuthedLayout>
                    </RequireAuth>
                }
            />
            <Route
                path="/admin"
                element={
                    <RequireAdmin>
                        <AuthedLayout>
                            <AdminPanel />
                        </AuthedLayout>
                    </RequireAdmin>
                }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <RouterTree />
            </BrowserRouter>
        </AuthProvider>
    );
}
