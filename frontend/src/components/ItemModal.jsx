import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createItem } from '../api';
import { toast } from 'react-hot-toast';
import { useTheme } from './ThemeProvider';

const ItemModal = ({ isOpen, onClose, onAddItem }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('Undefined');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { isDarkMode } = useTheme();

  const clearFields = () => {
    setName('');
    setDescription('');
    setQuantity(0);
    setLocation('Undefined');
    setError('');
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'description') setDescription(value);
    if (name === 'quantity') setQuantity(Number(value));
    if (name === 'location') setLocation(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userId = JSON.parse(localStorage.getItem('userInfo'))._id;
      const newItem = await createItem({ name, description, quantity, location, createdBy: userId });
      //onAddItem(newItem);
      toast.success('Item added successfully!');
      clearFields();
    } catch (error) {
      console.error('Error adding item:', error);
      setError(error.response?.data?.error || 'Failed to add item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-2xl w-96`}
          >
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Add New Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  required
                  className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>Description</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={handleChange}
                  className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                  className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-1`}>Location</label>
                <select
                  name="location"
                  value={location}
                  onChange={handleChange}
                  className={`w-full p-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                >
                  <option value="Undefined">Undefined</option>
                  <option value="Section A">Section A</option>
                  <option value="Section B">Section B</option>
                  <option value="Section C">Section C</option>
                  <option value="Section D">Section D</option>
                </select>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex justify-end space-x-2 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={clearFields}
                  className={`${isDarkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-500 text-white hover:bg-gray-600'} py-2 px-4 rounded-md transition-colors duration-300`}
                  disabled={isLoading}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'} py-2 px-4 rounded-md transition-colors duration-300`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItemModal;

