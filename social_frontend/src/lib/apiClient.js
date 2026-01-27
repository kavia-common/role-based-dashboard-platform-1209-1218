//
// A small fetch wrapper for the frontend with environment-based base URL,
// JSON handling, error normalization, and optional auth header support.
//

import { AppConfig } from '../config';

/**
 * Normalize errors to a consistent shape.
 */
function toApiError(error, response) {
  const base = {
    ok: false,
    status: response?.status || 0,
    statusText: response?.statusText || 'Network/Error',
    message: error?.message || 'Request failed',
    details: undefined,
  };
  return base;
}

/**
 * Join base URL and path with a single slash.
 */
function joinUrl(base, path) {
  if (!base) return path;
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}

/**
 * PUBLIC_INTERFACE
 * apiFetch performs a fetch call with base URL and sensible defaults.
 */
export async function apiFetch(path, options = {}) {
  /** This is a public function. */
  const {
    method = 'GET',
    headers = {},
    body,
    token,
    timeoutMs = 20000,
    baseUrl = AppConfig.apiBaseUrl,
  } = options;

  const url = joinUrl(baseUrl, path);

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  const reqHeaders = {
    Accept: 'application/json',
    ...headers,
  };

  // Add JSON content-type only when sending a plain object
  let requestBody = body;
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    reqHeaders['Content-Type'] = reqHeaders['Content-Type'] || 'application/json';
    requestBody = JSON.stringify(body);
  }

  if (token) {
    reqHeaders.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      method,
      headers: reqHeaders,
      body: requestBody,
      credentials: 'include', // allow cookies if same-origin/back-end configured
      signal: controller.signal,
    });
    clearTimeout(id);

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    if (!res.ok) {
      const errPayload = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined);
      const error = toApiError(
        { message: (errPayload && (errPayload.message || errPayload.error)) || `HTTP ${res.status}` },
        res
      );
      error.details = errPayload;
      throw error;
    }

    if (method === 'HEAD' || res.status === 204) {
      return { ok: true, status: res.status, data: null, headers: res.headers };
    }

    const data = isJson ? await res.json() : await res.text();
    return { ok: true, status: res.status, data, headers: res.headers };
  } catch (e) {
    clearTimeout(id);
    const apiErr = toApiError(e);
    if (AppConfig.logLevel === 'debug') {
      // eslint-disable-next-line no-console
      console.debug('apiFetch error', { path, error: apiErr });
    }
    throw apiErr;
  }
}

/**
 * PUBLIC_INTERFACE
 * apiGet helper for GET requests.
 */
export function apiGet(path, options = {}) {
  /** This is a public function. */
  return apiFetch(path, { ...options, method: 'GET' });
}

/**
 * PUBLIC_INTERFACE
 * apiPost helper for POST requests.
 */
export function apiPost(path, body, options = {}) {
  /** This is a public function. */
  return apiFetch(path, { ...options, method: 'POST', body });
}

/**
 * PUBLIC_INTERFACE
 * apiPut helper for PUT requests.
 */
export function apiPut(path, body, options = {}) {
  /** This is a public function. */
  return apiFetch(path, { ...options, method: 'PUT', body });
}

/**
 * PUBLIC_INTERFACE
 * apiPatch helper for PATCH requests.
 */
export function apiPatch(path, body, options = {}) {
  /** This is a public function. */
  return apiFetch(path, { ...options, method: 'PATCH', body });
}

/**
 * PUBLIC_INTERFACE
 * apiDelete helper for DELETE requests.
 */
export function apiDelete(path, options = {}) {
  /** This is a public function. */
  return apiFetch(path, { ...options, method: 'DELETE' });
}
