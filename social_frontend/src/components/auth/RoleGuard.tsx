import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext';

type Props = {
  allowed: Array<'user' | 'admin'>;
  children: React.ReactNode;
};

// PUBLIC_INTERFACE
export default function RoleGuard({ allowed, children }: Props) {
  /** Restricts access to routes based on user roles. Redirects to dashboard if unauthorized. */
  const { role } = useAuth();
  const location = useLocation();

  if (!role || !allowed.includes(role)) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
