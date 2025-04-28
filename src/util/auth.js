import axios from 'axios';

// Base URL 
const API_URL = 'https://ii-practicum-team-2-back.onrender.com/api/v1';

// Store tokens in localStorage
export const setTokens = ({ access_token, refresh_token }) => {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
};

export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios interceptor to add Bearer token to requests
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Axios interceptor to handle 401 errors and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        const response = await axios.post(`${API_URL}/users/refresh-token`, {
          refresh_token: refreshToken,
        });
        const { access_token, refresh_token } = response.data;
        setTokens({ access_token, refresh_token });
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        window.location.href = '/signin'; // Redirect to login if refresh fails
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;