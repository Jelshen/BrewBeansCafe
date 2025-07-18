import axios from "axios";
import Swal from "sweetalert2";

const API_URL = `${import.meta.env.VITE_BACKEND_DOMAIN_URL}/api`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isHandlingUnauthorized = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !isHandlingUnauthorized) {
      isHandlingUnauthorized = true;

      await Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Please log in again.",
        confirmButtonText: "OK",
      });

      // Redirect to login
      window.location.href = "/admin";
      // Return a rejected Promise with a known flag
      return Promise.reject({ handled: true });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
