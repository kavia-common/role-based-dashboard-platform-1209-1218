import React, { createContext, useContext, useMemo } from 'react';

type FeatureFlags = {
  enableAdmin?: boolean;
  enablePlatformAnalytics?: boolean;
};

type AppConfig = {
  apiBase: string;
  frontendUrl: string;
  wsUrl?: string;
  logLevel?: string;
  featureFlags: FeatureFlags;
  googleClientId?: string;
};

const ConfigContext = createContext<AppConfig | undefined>(undefined);

function parseFlags(raw?: string): FeatureFlags {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export const AppConfigProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const cfg = useMemo<AppConfig>(() => ({
    apiBase: process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '',
    frontendUrl: process.env.REACT_APP_FRONTEND_URL || window.location.origin,
    wsUrl: process.env.REACT_APP_WS_URL,
    logLevel: process.env.REACT_APP_LOG_LEVEL,
    featureFlags: parseFlags(process.env.REACT_APP_FEATURE_FLAGS),
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID
  }), []);

  return <ConfigContext.Provider value={cfg}>{children}</ConfigContext.Provider>;
};

// PUBLIC_INTERFACE
export function useAppConfig(): AppConfig {
  /** Provides environment-driven application configuration and feature flags. */
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useAppConfig must be used within AppConfigProvider');
  return ctx;
}
