import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './Sidebar';
import Item from './Item';
import ItemModal from './ItemModal';
import EditModal from './EditModal';
import { fetchItems, createItem, updateItem, deleteItem } from '../api';
import { ThemeProvider, useTheme } from './ThemeProvider';
import RightSidebar from './RightSidebar';
import { useAuth } from '..//useAuth';

const MainContent = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isDarkMode } = useTheme();
    const user = useAuth();

    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const fetchedItems = await fetchItems();
                setItems(fetchedItems);
                setFilteredItems(fetchedItems);

            } catch (error) {
                console.error('Error fetching items:', error);
                toast.error('Failed to fetch items.');
            }
        };

        fetchItemsData();
    }, []);


    const handleAddItem = async (newItem) => {
        try {
            const createdItem = await createItem(newItem);
            setItems(prevItems => [...prevItems, createdItem]);
            setFilteredItems(prevItems => [...prevItems, createdItem]);
            setIsModalOpen(false);
            setRefresh(!refresh);
            toast.success('Item added successfully!');
        } catch (error) {
            console.error('Error adding item:', error);
            toast.error('Failed to add item.');
        }
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
            setRefresh(!refresh);
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
            setRefresh(!refresh);
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


    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className={`flex min-h-screen ${isDarkMode ? 'bg-teal' : 'bg-navyBlue/60'}`}>

            <div className="w-64 flex-shrink-0">
                <Sidebar onSearch={handleSearch} onFilterByLocation={handleFilterByLocation} />
            </div>


            <div className={`flex-1 p-8 ${isSidebarOpen ? 'pr-72' : ''} transition-all duration-300`}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-darkTeal' : 'text-white'}`}
                >
                    Inventory Items
                </motion.h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)}
                    className={`${isDarkMode ? 'bg-darkTeal text-white' : 'bg-white text-navyBlue'} py-2 px-6 rounded-full ${isDarkMode ? 'hover:bg-skyBlue' : 'hover:bg-lightTeal'} transition-all duration-300 shadow-lg mb-8`}
                >
                    Add New Item
                </motion.button>
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}
                    >
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <Item
                                    key={item._id}
                                    item={item}
                                    onDelete={handleDeleteItem}
                                    onEdit={handleEditItem}
                                    user={user} 
                                />
                            ))
                        ) : (
                            <p className={`${isDarkMode ? 'text-white' : 'text-gray-800'} col-span-3 text-center`}>No items found.</p>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Right Sidebar */}
            <RightSidebar onToggle={toggleSidebar} />


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

