import axios from 'axios';
import { getToken } from '../state/token';

const baseURL =
  process.env.REACT_APP_API_BASE ||
  process.env.REACT_APP_BACKEND_URL ||
  '';

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 20000
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Basic error shaping
    const message =
      err?.response?.data?.message || err.message || 'Unknown error';
    return Promise.reject(new Error(message));
  }
);
