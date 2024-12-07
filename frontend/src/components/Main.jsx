import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './Sidebar';
import Item from './Item';
import ItemModal from './ItemModal';
import EditModal from './EditModal';
import { deleteItem, updateItem } from '../api';
import { ThemeProvider, useTheme } from './ThemeProvider';

const MainContent = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                setItems(response.data || []);
                setFilteredItems(response.data || []);
            } catch (error) {
                console.error('Error fetching items:', error);
                toast.error('Failed to fetch items.');
            }
        };

        fetchItems();
    }, []); 

    const handleAddItem = (newItem) => {
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        setFilteredItems(updatedItems);
        setIsModalOpen(false);
        toast.success('Item added successfully!');
    };

    const handleUpdateItem = async (updatedItem) => {
        try {
            const response = await updateItem(updatedItem._id, updatedItem);
            const updatedItems = items.map((item) => 
                item._id === updatedItem._id ? response : item
            );
            setItems(updatedItems);
            setFilteredItems(updatedItems);
            setIsEditModalOpen(false);
            toast.success('Item updated successfully!');
        } catch (error) {
            console.error('Error updating item:', error);
            toast.error('Failed to update item.');
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteItem(id);
            const updatedItems = items.filter((item) => item._id !== id);
            setItems(updatedItems);
            setFilteredItems(updatedItems);
            toast.success('Item deleted successfully!');
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('Failed to delete item.');
        }
    };

    const handleEditItem = (item) => {
        setCurrentItem(item);
        setIsEditModalOpen(true);
    };

    const handleSearch = (searchTerm) => {
        const filtered = items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleFilterByLocation = (location) => {
        if (location === 'All') {
            setFilteredItems(items);
        } else {
            const filtered = items.filter((item) => item.location === location);
            setFilteredItems(filtered);
        }
    };

    return (
        <div className={`flex min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-darkTeal to-teal' : 'bg-gradient-to-br from-gray-100 to-white'}`}>
            <Sidebar onSearch={handleSearch} onFilterByLocation={handleFilterByLocation} />
            <div className="flex-1 p-8">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-skyBlue' : 'text-teal'}`}
                >
                    Inventory Items
                </motion.h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)}
                    className={`${isDarkMode ? 'bg-lightTeal text-white' : 'bg-teal text-white'} py-2 px-6 rounded-full ${isDarkMode ? 'hover:bg-skyBlue' : 'hover:bg-lightTeal'} transition-all duration-300 shadow-lg mb-8`}
                >
                    Add New Item
                </motion.button>
                <AnimatePresence>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <Item
                                    key={item._id}
                                    item={item}
                                    onDelete={handleDeleteItem}
                                    onEdit={handleEditItem}
                                />
                            ))
                        ) : (
                            <p className={`${isDarkMode ? 'text-white' : 'text-gray-800'} col-span-3 text-center`}>No items found.</p>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
            <ItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddItem={handleAddItem}
            />
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                item={currentItem}
                onUpdateItem={handleUpdateItem}
            />
            <Toaster position="bottom-right" />
        </div>
    );
};

const Main = () => (
    <ThemeProvider>
        <MainContent />
    </ThemeProvider>
);

export default Main;

