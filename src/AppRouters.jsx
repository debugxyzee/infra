// src/AppRouters.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from './Pages/Main';
import Layout from './Layout/SuperAdmin/Layout'; 

// *** CONFIGURATION ***
const MAINTENANCE_MODE_ENABLED = false;
const ENFORCE_ROUTE_PROTECTION = false;
const allowedRoles = ["user", "admin", "superadmin"];

// *** UTILITY FUNCTIONS ***
const isTokenValid = () => {
  const token = sessionStorage.getItem("token");
  const tokenExpiry = sessionStorage.getItem("tokenExpiry");

  if (!token || !tokenExpiry) {
    return false;
  }

  const now = new Date().getTime();
  const expiryTime = parseInt(tokenExpiry);

  if (now > expiryTime) {
    clearSessionData();
    return false;
  }

  return true;
};

const clearSessionData = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("tokenExpiry");
  sessionStorage.removeItem("user");
};

// *** AUTH CONTEXT ***
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isTokenValid()) {
      const storedRole = sessionStorage.getItem("role");
      const storedUser = JSON.parse(sessionStorage.getItem("user") || '{}');
      setRole(storedRole);
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData, userRole, token, expiryTime) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", userRole);
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("tokenExpiry", expiryTime);

    setUser(userData);
    setRole(userRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearSessionData();
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// *** BASIC COMPONENTS ***
const EmptyComponent = ({ pageName }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">{pageName}</h1>
    <p className="text-gray-600">This is the {pageName} page - ready for your content.</p>
  </div>
);

const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page not found</p>
      <button
        onClick={() => window.location.href = '/'}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Home
      </button>
    </div>
  </div>
);

const Unauthorized = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-red-600">Unauthorized</h1>
      <p className="text-lg text-gray-600 mt-4">You don't have permission to access this page</p>
      <button
        onClick={() => window.location.href = '/'}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Home
      </button>
    </div>
  </div>
);

const MaintenancePage = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-orange-600">Under Maintenance</h1>
      <p className="text-lg text-gray-600 mt-4">We'll be back soon!</p>
    </div>
  </div>
);

const LandingPage = () => {
  if (isTokenValid()) {
    const role = sessionStorage.getItem("role");
    switch (role) {
      case "user":
        return <Navigate to="/user/dashboard" replace />;
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "superadmin":
        return <Navigate to="/superadmin/dashboard" replace />;
      default:
        clearSessionData();
        break;
    }
  }
  return <EmptyComponent pageName="Landing Page" />;
};

// *** PROTECTION COMPONENTS ***
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

const TokenWrapper = ({ children }) => {
  if (!ENFORCE_ROUTE_PROTECTION) {
    return children;
  }
  if (!isTokenValid()) {
    clearSessionData();
    return <Navigate to="/" replace />;
  }
  const role = sessionStorage.getItem("role");
  if (!role || !allowedRoles.includes(role)) {
    clearSessionData();
    return <Navigate to="/" replace />;
  }
  return children;
};

const ProtectedRouteWrapper = ({ allowedRoles, children }) => {
  if (!ENFORCE_ROUTE_PROTECTION) {
    return children;
  }
  if (!isTokenValid()) {
    clearSessionData();
    return <Navigate to="/" replace />;
  }
  return <ProtectedRoute allowedRoles={allowedRoles}>{children}</ProtectedRoute>;
};

const RedirectDashboard = () => {
  if (!ENFORCE_ROUTE_PROTECTION) {
    return <Navigate to="/user/dashboard" replace />;
  }
  if (!isTokenValid()) {
    clearSessionData();
    return <Navigate to="/" replace />;
  }
  const role = sessionStorage.getItem("role");
  switch (role) {
    case "user":
      return <Navigate to="/user/dashboard" replace />;
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    case "superadmin":
      return <Navigate to="/superadmin/dashboard" replace />;
    default:
      clearSessionData();
      return <Navigate to="/" replace />;
  }
};

const MaintenanceWrapper = ({ children }) => {
  if (MAINTENANCE_MODE_ENABLED) {
    return <MaintenancePage />;
  }
  return children;
};

// *** MAIN APP ROUTER ***
const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <MaintenanceWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<EmptyComponent pageName="Signup Page" />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/404" element={<NotFound />} />

            {/* Main Landing Page */}
            <Route path="/" element={<Main />} />

            {/* Dashboard redirect */}
            <Route
              path="/dashboard"
              element={
                <TokenWrapper>
                  <RedirectDashboard />
                </TokenWrapper>
              }
            />

            {/* User Routes */}
            <Route path="/user/login" element={<EmptyComponent pageName="User Login" />} />
            <Route
              path="/user/*"
              element={
                <TokenWrapper>
                  <ProtectedRouteWrapper allowedRoles={["user"]}>
                    <Layout>
                      <Routes>
                        <Route path="dashboard" element={<EmptyComponent pageName="User Dashboard" />} />
                        <Route path="profile" element={<EmptyComponent pageName="User Profile" />} />
                        <Route path="settings" element={<EmptyComponent pageName="User Settings" />} />
                        <Route path="reports" element={<EmptyComponent pageName="User Reports" />} />
                        <Route path="forms" element={<EmptyComponent pageName="User Forms" />} />
                        <Route path="notifications" element={<EmptyComponent pageName="User Notifications" />} />
                        <Route path="*" element={<NotFound />} />
                        <Route index element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </Layout>
                  </ProtectedRouteWrapper>
                </TokenWrapper>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<EmptyComponent pageName="Admin Login" />} />
            <Route
              path="/admin/*"
              element={
                <TokenWrapper>
                  <ProtectedRouteWrapper allowedRoles={["admin"]}>
                    <Layout>
                      <Routes>
                        <Route path="dashboard" element={<EmptyComponent pageName="Admin Dashboard" />} />
                        <Route path="users" element={<EmptyComponent pageName="Admin Users" />} />
                        <Route path="reports" element={<EmptyComponent pageName="Admin Reports" />} />
                        <Route path="settings" element={<EmptyComponent pageName="Admin Settings" />} />
                        <Route path="analytics" element={<EmptyComponent pageName="Admin Analytics" />} />
                        <Route path="permissions" element={<EmptyComponent pageName="Admin Permissions" />} />
                        <Route path="*" element={<NotFound />} />
                        <Route index element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </Layout>
                  </ProtectedRouteWrapper>
                </TokenWrapper>
              }
            />

            {/* Superadmin Routes */}
            <Route path="/superadmin/login" element={<EmptyComponent pageName="Superadmin Login" />} />
            <Route
              path="/superadmin/*"
              element={
                <TokenWrapper>
                  <ProtectedRouteWrapper allowedRoles={["superadmin"]}>
                    <Layout>
                      <Routes>
                        <Route path="dashboard" element={<EmptyComponent pageName="Superadmin Dashboard" />} />
                        <Route path="users" element={<EmptyComponent pageName="Superadmin Users" />} />
                        <Route path="admins" element={<EmptyComponent pageName="Superadmin Admins" />} />
                        <Route path="reports" element={<EmptyComponent pageName="Superadmin Reports" />} />
                        <Route path="settings" element={<EmptyComponent pageName="Superadmin Settings" />} />
                        <Route path="logs" element={<EmptyComponent pageName="Superadmin Logs" />} />
                        <Route path="system" element={<EmptyComponent pageName="Superadmin System" />} />
                        <Route path="backup" element={<EmptyComponent pageName="Superadmin Backup" />} />
                        <Route path="*" element={<NotFound />} />
                        <Route index element={<Navigate to="dashboard" replace />} />
                      </Routes>
                    </Layout>
                  </ProtectedRouteWrapper>
                </TokenWrapper>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MaintenanceWrapper>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
export { useAuth, AuthProvider, ProtectedRoute, isTokenValid, clearSessionData };
