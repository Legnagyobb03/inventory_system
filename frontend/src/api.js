import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const retryRequest = async (fn, retries = 1, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};


export const fetchItems = async () => {
  try {
    const response = await retryRequest(() => api.get('/items'));
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error.response?.data || error.message);
    throw error;
  }
};


export const createItem = async (itemData) => {
  try {
    const response = await retryRequest(() => api.post('/items', itemData));
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error.response?.data || error.message);
    throw error;
  }
};


export const updateItem = async (id, itemData) => {
  try {
    const response = await retryRequest(() => api.put(`/items/${id}`, itemData));
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error.response?.data || error.message);
    throw error;
  }
};


export const deleteItem = async (id) => {
  try {
    const response = await retryRequest(() => api.delete(`/items/${id}`));
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error.response?.data || error.message);
    throw error;
  }
};


export const fetchUsers = async () => {
  try {
    const response = await retryRequest(() => api.get('/users'));
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    throw error;
  }
};


export const createUser = async (userData) => {
  try {
    const response = await retryRequest(() => api.post('/users', userData));
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error.message);
    throw error;
  }
};


export const updateUser = async (id, userData) => {
  try {
    const response = await retryRequest(() => api.put(`/users/${id}`, userData));
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response?.data || error.message);
    throw error;
  }
};


export const deleteUser = async (id) => {
  try {
    const response = await retryRequest(() => api.delete(`/users/${id}`));
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error.response?.data || error.message);
    throw error;
  }
};

// Login
export const login = async (credentials) => {
  try {
    const response = await retryRequest(() => api.post('/auth/login', credentials));
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

// Register
export const register = async (userData) => {
  try {
    const response = await retryRequest(() => api.post('/auth/register', userData));
    return response.data;
  } catch (error) {
    console.error('Error registering:', error.response?.data || error.message);
    throw error;
  }
};

export const updateUserProfile = async (id, userData) => {
  try {
    const response = await retryRequest(() => api.put(`/users/${id}`, userData));
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error.response?.data || error.message);
    throw error;
  }
};

export default api;



