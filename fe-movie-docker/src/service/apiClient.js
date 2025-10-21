import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; //URL Backend untuk user-service (autentikasi)

// Setup instance untuk pengaturan default URL yang konsisten
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Setup Interceptor (pengecekan request) serta untuk menambahkan Authorization di setiap requestnya
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
