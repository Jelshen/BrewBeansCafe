import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_DOMAIN_URL}/api`;

const fetchMenu = {
  getMenu: async () => {
    try {
      const response = await axios.get(`${API_URL}/menu`);
      console.log(API_URL);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch menu");
    }
  },
};

export default fetchMenu;
