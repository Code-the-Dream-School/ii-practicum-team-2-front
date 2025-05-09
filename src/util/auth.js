import axios from "axios";

export const API_URL =
  import.meta.env.VITE_BASE_URL ||
  "https://ii-practicum-team-2-back.onrender.com/api/v1";

export const setUserData = (userData) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: userData.id,
      name: userData.name,
      email: userData.email,
    })
  );
};

export const getUserData = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

export const clearUserData = () => {
  localStorage.removeItem("user");
};

export const setTokens = ({ access_token, refresh_token, user }) => {
  try {
    if (!access_token || !refresh_token) {
      console.error('Missing tokens in setTokens');
      return false;
    }
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    if (user) {
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email
      }));
    }
    console.log('Auth data stored successfully:', {
      access_token: !!access_token,
      refresh_token: !!refresh_token,
      user: !!user
    });
    return true;
  } catch (error) {
    console.error('Error storing auth data:', error);
    return false;
  }
};

export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");
export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  clearUserData();
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log("Request URL:", config.url);
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response.config.url, response.status);
    return response;
  },
  async (error) => {
    console.error(
      "Response error:",
      error.response?.config.url,
      error.response?.status,
      error.response?.data
    );
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
        console.error("Refresh token error:", refreshError);
        clearTokens();
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
