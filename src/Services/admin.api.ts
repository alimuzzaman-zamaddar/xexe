import axios from "axios";
import { getItem } from "../utils/localStorage";


// Function to get dashboard data for admin
export const getDashboardData = async () => {
  const token = getItem("token"); // Retrieve token from localStorage
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SITE_URL, // Your base API URL
  });

  const response = await axiosInstance.get("/api/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`, // Include token in headers
      Accept: "application/json", // Ensure the response is in JSON format
    },
  });

  return response.data;
};
