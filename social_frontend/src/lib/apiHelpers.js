//
// Domain-specific API helpers built on top of apiClient.
//

import { apiGet } from './apiClient';
import { AppConfig } from '../config';

/**
 * PUBLIC_INTERFACE
 * getHealthStatus fetches service health from REACT_APP_HEALTHCHECK_PATH (default /healthz).
 */
export async function getHealthStatus() {
  /** This is a public function. */
  const res = await apiGet(AppConfig.healthcheckPath);
  return res.data;
}

/**
 * PUBLIC_INTERFACE
 * getProfile retrieves the current user's profile.
 * Expected backend route: GET /api/profile (adjust as needed).
 */
export async function getProfile() {
  /** This is a public function. */
  const res = await apiGet('/api/profile');
  return res.data;
}
