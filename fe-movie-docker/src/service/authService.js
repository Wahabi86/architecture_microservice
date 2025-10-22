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
