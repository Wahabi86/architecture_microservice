import axios from "axios";

const API_URL = import.meta.env.VITE_SUBSCRIPTION_API_URL; //URL Backend untuk subcription (rent)

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

// Mengirim data subscription ke backend
export const createSubscription = async (plan) => {
  const res = await apiClient.post("/subscribe", {plan});
  return res.data;
};
