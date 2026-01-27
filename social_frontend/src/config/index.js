//
// Centralized app configuration and feature flags for the React frontend.
//
// Reads environment variables using CRA's REACT_APP_* prefix and exposes
// a typed, documented configuration object across the app.
//
// Note: Do not hardcode environment values in code.
//       Request/define them in the .env file configured by the orchestrator.
//

/**
 * Parse boolean-like strings safely.
 * Accepts: '1', 'true', 'yes' (case-insensitive) as true; otherwise false.
 */
function parseBool(val, defaultValue = false) {
  if (val == null) return defaultValue;
  const s = String(val).trim().toLowerCase();
  return s === '1' || s === 'true' || s === 'yes';
}

/**
 * Parse JSON with graceful fallback.
 */
function parseJSON(val, fallback) {
  if (!val) return fallback;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

/**
 * Ensure trailing slash is removed from URLs to avoid double slashes when joining.
 */
function stripTrailingSlash(url) {
  if (!url) return url;
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

/**
 * Derive API base from multiple envs with sensible fallback order.
 * - REACT_APP_API_BASE
 * - REACT_APP_BACKEND_URL
 * - default to same-origin '' (relative paths)
 */
function resolveApiBase() {
  const base =
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_BACKEND_URL ||
    '';
  return stripTrailingSlash(base);
}

/**
 * PUBLIC_INTERFACE
 * getConfig returns immutable runtime configuration and feature flags.
 */
export function getConfig() {
  /** This is a public function. */
  const cfg = {
    // App/meta
    nodeEnv: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || 'development',
    logLevel: process.env.REACT_APP_LOG_LEVEL || 'info',

    // Endpoints
    apiBaseUrl: resolveApiBase(),
    frontendUrl: stripTrailingSlash(process.env.REACT_APP_FRONTEND_URL || ''),
    wsUrl: stripTrailingSlash(process.env.REACT_APP_WS_URL || ''),

    // Server/runtime toggles
    port: process.env.REACT_APP_PORT || '3000',
    trustProxy: parseBool(process.env.REACT_APP_TRUST_PROXY, false),
    nextTelemetryDisabled: parseBool(process.env.REACT_APP_NEXT_TELEMETRY_DISABLED, true),
    enableSourceMaps: parseBool(process.env.REACT_APP_ENABLE_SOURCE_MAPS, false),

    // Health
    healthcheckPath: process.env.REACT_APP_HEALTHCHECK_PATH || '/healthz',

    // Feature flags (JSON or comma-separated list of flags=on/off)
    featureFlagsRaw: process.env.REACT_APP_FEATURE_FLAGS || '',
    experimentsEnabled: parseBool(process.env.REACT_APP_EXPERIMENTS_ENABLED, false),
  };

  // Build normalized feature flags map
  let featureFlags = {};
  // Try JSON first
  const json = parseJSON(cfg.featureFlagsRaw, null);
  if (json && typeof json === 'object') {
    featureFlags = Object.entries(json).reduce((acc, [k, v]) => {
      acc[String(k)] = !!v;
      return acc;
    }, {});
  } else if (typeof cfg.featureFlagsRaw === 'string' && cfg.featureFlagsRaw.trim().length > 0) {
    // Parse CSV like: flagA=true,flagB=1,flagC=false
    cfg.featureFlagsRaw.split(',').forEach((pair) => {
      const [k, v] = pair.split('=');
      if (!k) return;
      featureFlags[k.trim()] = parseBool((v || 'true').trim(), true);
    });
  }

  const config = Object.freeze({
    ...cfg,
    featureFlags: Object.freeze(featureFlags),
  });

  return config;
}

// PUBLIC_INTERFACE
export const AppConfig = getConfig();
/** This is a public object that holds the resolved configuration for the app. */
