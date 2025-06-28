import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_DOMAIN_URL}/api`;

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

  postMenu: async ({ menuItem }) => {
    try {
      const response = await axios.post(`${API_URL}/menu`, menuItem);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to add menu item"
      );
    }
  },
};

export default fetchMenu;
