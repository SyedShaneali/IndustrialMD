import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? " https://0135-72-255-34-72.ngrok-free.app/api"
      : import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true", // 👈 This skips the interstitial page
  },
});
// ─── Request interceptor ──────────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    // ✅ If sending FormData, delete any lingering Content-Type so the browser
    //    can inject the correct multipart boundary automatically
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor ─────────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.warn("Unauthorized — handle redirect to login here");
    }
    return Promise.reject(error);
  }
);