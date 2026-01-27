import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { api } from '../api/client';
import { saveToken, clearToken, getToken } from './token';

type Role = 'user' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  role: Role | null;
  signInWithGoogle: (googleIdToken: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple JWT payload type
type JwtPayload = {
  sub: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  role?: Role;
  exp?: number;
};

function parseUserFromToken(token: string): User | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const user: User = {
      id: decoded.sub,
      name: decoded.name || 'User',
      email: decoded.email || '',
      avatarUrl: decoded.avatarUrl,
      role: decoded.role || 'user'
    };
    return user;
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Attempt to restore session from token
  useEffect(() => {
    const token = getToken();
    if (token) {
      const parsed = parseUserFromToken(token);
      if (parsed) {
        setUser(parsed);
      } else {
        clearToken();
      }
    }
  }, []);

  const signInWithGoogle = useCallback(async (googleIdToken: string) => {
    // Exchange Google ID token with backend for application JWT
    // Expect backend endpoint: POST /auth/google { idToken }
    const response = await api.post('/auth/google', { idToken: googleIdToken });
    const appToken: string = response.data?.token;
    if (!appToken) {
      throw new Error('Authentication failed: token missing');
    }
    saveToken(appToken);
    const parsed = parseUserFromToken(appToken);
    if (!parsed) throw new Error('Invalid token received');
    setUser(parsed);
  }, []);

  const signOut = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const ctx = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated: !!user,
    role: user?.role ?? null,
    signInWithGoogle,
    signOut
  }), [user, signInWithGoogle, signOut]);

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

// PUBLIC_INTERFACE
export function useAuth(): AuthContextType {
  /** Access auth state, role, and auth actions. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
