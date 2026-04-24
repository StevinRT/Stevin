import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const http = axios.create({ baseURL: API });

// Attach admin token automatically (if present) on any request
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("pjours_admin_token");
  if (token) {
    config.headers = config.headers || {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

http.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      // Expire the token so the Admin UI prompts login again
      localStorage.removeItem("pjours_admin_token");
    }
    return Promise.reject(err);
  }
);
