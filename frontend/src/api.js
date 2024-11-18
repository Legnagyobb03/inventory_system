import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const deleteItem = async (id) => {
    try {
        const response = await api.delete(`/items/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
};

export const updateItem = async (id, updatedData) => {
  try {
      const response = await api.put(`/items/${id}`, updatedData);
      return response.data;
  } catch (error) {
      console.error('Error updating item:', error);
      throw error;
  }
};

export default api;
