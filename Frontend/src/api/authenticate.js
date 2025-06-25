// auth.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_DOMAIN_URL}/api`;

const authenticate = {
  login: async (username, password) => {
    console.log(API_URL);
    try {
      const response = await axios.post(
        `${API_URL}/auth`,
        { username, password },
        { withCredentials: true } // allow cookie
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  },
};
export default authenticate;
