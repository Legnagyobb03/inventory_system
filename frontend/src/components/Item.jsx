import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useTheme } from './ThemeProvider';

const Item = ({ item, onDelete, onEdit }) => {
    const { isDarkMode } = useTheme();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await onDelete(item._id);
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.03 }}
            className={`${isDarkMode ? 'bg-teal' : 'bg-white'} rounded-lg shadow-lg p-6 transition-all duration-300`}
        >
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{item.name}</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>{item.description}</p>
            <div className="flex justify-between items-center mb-4">
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-800'} font-semibold`}>Quantity: {item.quantity}</p>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-800'} font-semibold`}>Location: {item.location}</p>
            </div>
            <div className="flex justify-end space-x-2">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEdit(item)}
                    className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors duration-300"
                >
                    <FaEdit />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDelete}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                >
                    <FaTrash />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Item;

