import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useTheme } from './ThemeProvider';
import toast from 'react-hot-toast';

const Item = ({ item, onDelete, onEdit, user }) => {
  const { isDarkMode } = useTheme();

  const canEditOrDelete = () => {
    console.log('Current user:', user);
    console.log('Item creator ID:', item.createdBy);

    const currentUserId = String(user.user?._id || '');
    const itemCreatorId = String(item.createdBy?._id || '');
    return user.user?.role === 'admin' || currentUserId === itemCreatorId;
  };

  const handleDelete = async () => {
    if (!canEditOrDelete()) {
      toast.error('You can only delete your own items.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await onDelete(item._id);
        toast.success('Item deleted successfully.');
      } catch (error) {
        console.error('Error deleting item:', error);
        toast.error(error.message || 'Failed to delete item.');
      }
    }
  };

  const handleEdit = () => {
    if (!canEditOrDelete()) {
      toast.error('You can only edit your own items.');
      return;
    }

    onEdit(item);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.03, boxShadow: "0px 5px 15px rgba(70,130,180,0.2)" }}
      className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-darkTeal '} rounded-lg shadow-xl p-6 transition-all duration-300`}
    >
      <motion.h3 
        className={`text-xl font-bold mb-2`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {item.name}
      </motion.h3>
      <motion.p 
        className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {item.description}
      </motion.p>
      <motion.div 
        className="flex justify-between items-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className={`${isDarkMode ? 'text-blue-300' : 'text-blue-600'} font-semibold`}>Quantity: {item.quantity}</p>
        <p className={`${isDarkMode ? 'text-green-300' : 'text-green-600'} font-semibold`}>Location: {item.location}</p>
      </motion.div>
      <motion.div 
        className="text-sm text-gray-500 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>
          Created by: {item.createdBy?.name || 'Unknown'} on{' '}
          {new Date(item.createdAt).toLocaleDateString()}
        </p>
      </motion.div>
      <motion.div 
        className="flex justify-end space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleEdit}
          className={`bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors duration-300`}
        >
          <FaEdit />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          className={`bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300`}
        >
          <FaTrash />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Item;
