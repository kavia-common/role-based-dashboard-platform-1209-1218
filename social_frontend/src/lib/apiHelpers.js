//
//
// Domain-specific API helpers built on top of apiClient.
//
// These helpers centralize endpoint paths and feature-flag decisions so
// components can remain clean and focused on rendering.
//
// All public functions include robust doc comments and adhere to the
// PUBLIC_INTERFACE requirement.
//
import { apiGet } from './apiClient';
import { AppConfig } from '../config';

/**
 * PUBLIC_INTERFACE
 * getHealthStatus fetches service health from REACT_APP_HEALTHCHECK_PATH (default /healthz).
 * This call is allowed even when API calls are otherwise disabled since it
 * targets a health endpoint and is often same-origin. Components should still
 * wrap it with try/catch and loading/error states.
 */
export async function getHealthStatus() {
  /** This is a public function. */
  const res = await apiGet(AppConfig.healthcheckPath);
  return res.data;
}

/**
 * PUBLIC_INTERFACE
 * getCurrentUser retrieves the current user's profile from the backend.
 * Expected backend route: GET /user/me
 *
 * This helper respects feature flags:
 * - If features.disableApi or features.disableProfileFetch is true, it throws
 *   an Error so components can fall back to placeholders.
 */
export async function getCurrentUser() {
  /** This is a public function. */
  const features = AppConfig.featureFlags || {};
  const apiDisabled = features.disableApi === true || features.disableProfileFetch === true;

  if (apiDisabled) {
    throw new Error('Profile fetch disabled by feature flag');
  }
  const res = await apiGet('/user/me');
  return res.data;
}

/**
 * PUBLIC_INTERFACE
 * getNotifications fetches recent notifications for the current user.
 * Expected backend route: GET /notifications or /user/notifications (adjust to backend).
 *
 * Feature flags:
 * - If disableApi OR disableNotificationsFetch is true, this function will throw,
 *   allowing the UI to use local placeholders.
 * - If the backend returns an empty list, the UI will show an empty state.
 */
export async function getNotifications() {
  /** This is a public function. */
  const features = AppConfig.featureFlags || {};
  const apiDisabled = features.disableApi === true || features.disableNotificationsFetch === true;

  if (apiDisabled) {
    throw new Error('Notifications fetch disabled by feature flag');
  }
  // Prefer a generic /notifications path; adjust here if your backend differs.
  const res = await apiGet('/notifications');
  // Normalize to array
  const data = Array.isArray(res.data) ? res.data : (res.data?.items || []);
  return data;
}
