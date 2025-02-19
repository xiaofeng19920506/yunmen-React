import axios from "axios";

// Create an Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally add interceptors for requests or responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally (e.g., logging, notifications)
    return Promise.reject(error);
  }
);

export default axiosInstance;