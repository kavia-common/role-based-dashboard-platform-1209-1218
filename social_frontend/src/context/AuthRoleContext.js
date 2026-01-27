import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * AuthRoleContext provides the current auth session role and helpers
 * to switch role in demo mode and to check role-based permissions.
 *
 * This is a lightweight client-side mock for role-based UI. In a real app
 * you would hydrate this from backend auth/session info.
 */
const AuthRoleContext = createContext({
  role: 'user',
  setRole: () => {},
  isAdmin: false,
  isUser: true,
  // Mock session fields
  session: null,
  signInDemo: () => {},
  signOutDemo: () => {},
  toggleRoleDemo: () => {},
});

/**
 * PUBLIC_INTERFACE
 * AuthRoleProvider wraps the app and exposes role and session state
 * to children components.
 */
export function AuthRoleProvider({ children }) {
  // Persist role in localStorage for a nicer demo experience
  const [role, setRole] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('rb_role') : null;
    return saved === 'admin' || saved === 'user' ? saved : 'user';
  });

  // Simulated session object for demo mode
  const [session, setSession] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('rb_session') : null;
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('rb_role', role);
    } catch {}
  }, [role]);

  useEffect(() => {
    try {
      if (session) {
        window.localStorage.setItem('rb_session', JSON.stringify(session));
      } else {
        window.localStorage.removeItem('rb_session');
      }
    } catch {}
  }, [session]);

  const signInDemo = (asRole = 'user') => {
    const nextRole = asRole === 'admin' ? 'admin' : 'user';
    setRole(nextRole);
    setSession({
      user: { id: 'demo-user', email: `demo+${nextRole}@example.com` },
      role: nextRole,
      demo: true,
      issuedAt: Date.now(),
    });
  };

  const signOutDemo = () => {
    setSession(null);
    setRole('user');
  };

  const toggleRoleDemo = () => {
    setRole(prev => (prev === 'admin' ? 'user' : 'admin'));
    setSession(prev => {
      if (!prev) {
        return {
          user: { id: 'demo-user', email: 'demo@example.com' },
          role: role === 'admin' ? 'user' : 'admin',
          demo: true,
          issuedAt: Date.now(),
        };
      }
      return {
        ...prev,
        role: role === 'admin' ? 'user' : 'admin',
      };
    });
  };

  const value = useMemo(() => {
    return {
      role,
      setRole,
      isAdmin: role === 'admin',
      isUser: role === 'user',
      session,
      signInDemo,
      signOutDemo,
      toggleRoleDemo,
    };
  }, [role, session]);

  return <AuthRoleContext.Provider value={value}>{children}</AuthRoleContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useAuthRole hook to consume role/session context in any component.
 */
export function useAuthRole() {
  const ctx = useContext(AuthRoleContext);
  if (!ctx) {
    throw new Error('useAuthRole must be used within an AuthRoleProvider');
  }
  return ctx;
}

export default AuthRoleContext;
