import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import AdminUsers from './pages/admin/AdminUsers';
import PlatformAnalytics from './pages/admin/PlatformAnalytics';
import SignIn from './pages/auth/SignIn';
import { useAuth } from './state/AuthContext';
import RoleGuard from './components/auth/RoleGuard';

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    );
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/admin/users"
          element={
            <RoleGuard allowed={['admin']}>
              <AdminUsers />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <RoleGuard allowed={['admin']}>
              <PlatformAnalytics />
            </RoleGuard>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
