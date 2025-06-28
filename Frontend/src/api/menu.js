import axios from "axios";
import axiosInstance from "../api/axiosInstance";

const API_URL = `${import.meta.env.VITE_BACKEND_DOMAIN_URL}/api`;

const fetchMenu = {
  getMenu: async () => {
    try {
      const response = await axios.get(`${API_URL}/menu`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch menu");
    }
  },

  getMenuImage: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/menu/image/${id}`, {
        // Backend sends image, sets the content type and axios will handle it
        responseType: "blob",
      });
      return URL.createObjectURL(response.data);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch menu image"
      );
    }
  },

  upsertMenu: async (menuItem) => {
    console.log("Menu item: ", menuItem);

    const formData = new FormData();
    formData.append("menu_name", menuItem.menu_name);
    formData.append("menu_price", menuItem.menu_price);
    formData.append("menu_description", menuItem.menu_description);
    formData.append("category_id", menuItem.category_id);

    console.log("Menu image: ", menuItem.menu_image);
    // Append image only if exists
    if (menuItem.menu_image) {
      formData.append("menu_image", menuItem.menu_image);
    }

    // Include menu_id if it's an update
    if (menuItem.menu_id) {
      formData.append("menu_id", menuItem.menu_id);
    }

    try {
      const response = await axiosInstance.post(`${API_URL}/menu`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (error?.handled) return null; // Handle session expiration
      throw new Error(
        error.response?.data?.error || "Failed to add/update menu item"
      );
    }
  },

  deleteMenu: async (id) => {
    try {
      const response = await axiosInstance.delete(`${API_URL}/menu/${id}`, {
        withCredentials: true,
      });
      if (response.status === 204) return true;

      return response.data;
    } catch (error) {
      if (error?.handled) return null; // Handle session expiration
      throw new Error(
        error.response?.data?.message || "Failed to delete menu item"
      );
    }
  },
};

export default fetchMenu;
