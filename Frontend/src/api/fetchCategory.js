import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_DOMAIN_URL}/api`;

const fetchCategories = {
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/category`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  },
};

export default fetchCategories;
