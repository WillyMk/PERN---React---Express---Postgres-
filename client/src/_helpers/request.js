import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: "http://localhost:8080", 
  headers: {
    "Content-Type": "application/json",
  },
});


const getAccessToken = () => localStorage.getItem("accessToken");

const getRefreshToken = () => localStorage.getItem("refreshToken");

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        // Call refresh endpoint
        const res = await axios.post("http://localhost:8080/api/refresh-token", {
          token: refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        // Save new access token
        localStorage.setItem("accessToken", newAccessToken);

        // Update the Authorization header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        // If refresh fails, logout or redirect
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // or use React Router
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;