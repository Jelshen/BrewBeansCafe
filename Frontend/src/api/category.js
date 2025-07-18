import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = `${import.meta.env.VITE_BACKEND_DOMAIN_URL}/api`;

const Categories = {
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

  addCategory: async (category) => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/category`,
        category
      );
      return response.data;
    } catch (error) {
      if (error?.handled) return null; // Handle session expiration
      throw new Error(
        error.response?.data?.error || "Failed to add/update category"
      );
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await axiosInstance.delete(`${API_URL}/category/${id}`);
      if (response.status === 204) return true;

      return response.data;
    } catch (error) {
      if (error?.handled) return null; // Handle session expiration
      throw new Error(
        error.response?.data?.error || "Failed to delete category"
      );
    }
  },
};

export default Categories;
