import apiClient from "./apiClient";

// Register
export const registerUser = async (data) => {
  const res = await apiClient.post("/register", data);
  return res.data;
};

// Login
export const loginUser = async (data) => {
  const res = await apiClient.post("/login", data);
  return res.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Change Name
export const updateName = async (data) => {
  const res = await apiClient.patch("/profile", data);
  return res.data;
};

// Change Password
export const changePassword = async (data) => {
  const res = await apiClient.patch("/profile/password", data);
  return res.data;
};

// Untuk mengecek subscription usernya
export const getProfile = async () => {
  const res = await apiClient.get("/profile");
  return res.data;
};

// Fungsi untuk mengambil daftar ID film dari watchlist user-service
export const getMyWatchlistIds = async () => {
  try {
    const response = await apiClient.get("/profile/watchlist");
    // Pastikan respons memiliki format yang diharapkan dan ambil array ID
    return response.data?.watchlist_movie_ids || [];
  } catch (error) {
    console.error("Error fetching watchlist IDs:", error.response?.data || error.message);
    throw error; // Lempar error agar bisa ditangani di komponen
  }
};

// Fungsi untuk menambahkan film ke watchlist di user-service
export const addToWatchlist = async (movieId) => {
    try {
        const response = await apiClient.post("/profile/watchlist", { movie_id: movieId });
        return response.data;
    } catch (error) {
        console.error("Error adding to watchlist:", error.response?.data || error.message);
        throw error;
    }
};

// Fungsi untuk menghapus film dari watchlist di user-service
export const removeFromWatchlist = async (movieId) => {
    try {
        // Endpoint DELETE biasanya memerlukan ID di URL
        const response = await apiClient.delete(`/profile/watchlist/${movieId}`);
        return response.data;
    } catch (error) {
        console.error("Error removing from watchlist:", error.response?.data || error.message);
        throw error;
    }
};