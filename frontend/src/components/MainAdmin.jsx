import React, { useState, useEffect } from 'react';
import { fetchItems, createItem, updateItem, deleteItem, fetchUsers, createUser, updateUser, deleteUser } from '../api';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './Sidebar';
import ItemModal from './ItemModal';
import EditModal from './EditModal';
import UserModal from './UserModal';
import { ThemeProvider, useTheme } from './ThemeProvider';
import RightSidebar from './RightSidebar';
import ItemsGraph from './ItemsGraph';

const MainAdmin = () => {
    const [items, setItems] = useState([]);
    const [users, setUsers] = useState([]);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        fetchItemsData();
        fetchUsersData();
    }, []);

    const fetchItemsData = async () => {
        try {
            const fetchedItems = await fetchItems();
            setItems(fetchedItems);
        } catch (error) {
            console.error('Error fetching items:', error);
            toast.error('Failed to fetch items.');
        }
    };

    const fetchUsersData = async () => {
        try {
            const fetchedUsers = await fetchUsers();
            setUsers(fetchedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users.');
        }
    };

    const handleAddItem = async (newItem) => {
        try {
            const createdItem = await createItem(newItem);
            setItems(prevItems => [...prevItems, createdItem]);
            setIsItemModalOpen(false);
            toast.success('Item added successfully!');
        } catch (error) {
            console.error('Error adding item:', error);
            toast.error('Failed to add item.');
        }
    };

    const handleUpdateItem = async (updatedItem) => {
        try {
            const response = await updateItem(updatedItem._id, updatedItem); //Update: Removed unnecessary user parameters
            const updatedItems = items.map((item) =>
                item._id === updatedItem._id ? response : item
            );
            setItems(updatedItems);
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

    const handleAddUser = async (newUser) => {
        try {
            const createdUser = await createUser(newUser);
            setUsers(prevUsers => [...prevUsers, createdUser]);
            setIsUserModalOpen(false);
            toast.success('User added successfully!');
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('Failed to add user.');
        }
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            const response = await updateUser(updatedUser._id, updatedUser);
            const updatedUsers = users.map((user) =>
                user._id === updatedUser._id ? response : user
            );
            setUsers(updatedUsers);
            setIsUserModalOpen(false);
            toast.success('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user.');
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            const updatedUsers = users.filter((user) => user._id !== id);
            setUsers(updatedUsers);
            toast.success('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user.');
        }
    };

    const handleEditUser = (user) => {
        setCurrentUser(user);
        setIsUserModalOpen(true);
    };

    return (
        <div className={`flex min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-darkTeal to-teal' : 'bg-gradient-to-br from-gray-100 to-white'}`}>
            <div className="flex-1 p-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-skyBlue' : 'text-teal'}`}
                >
                    Admin Dashboard
                </motion.h1>

                <section className="mb-8">
                    <h2 className={`text-2xl font-bold mb-mb-4 ${isDarkMode ? 'text-skyBlue' : 'text-teal'}`}>Inventory Items</h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsItemModalOpen(true)}
                        className={`${isDarkMode ? 'bg-lightTeal text-white' : 'bg-teal text-white'} py-2 px-6 rounded-full ${isDarkMode ? 'hover:bg-skyBlue' : 'hover:bg-lightTeal'} transition-all duration-300 shadow-lg mb-4`}
                    >
                        Add New Item
                    </motion.button>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 text-left">Name</th>
                                    <th className="py-2 px-4 text-left">Quantity</th>
                                    <th className="py-2 px-4 text-left">Location</th>
                                    <th className="py-2 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item._id} className="border-b">
                                        <td className="py-2 px-4">{item.name}</td>
                                        <td className="py-2 px-4">{item.quantity}</td>
                                        <td className="py-2 px-4">{item.location}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => handleEditItem(item)}
                                                className="text-blue-500 hover:text-blue-700 mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteItem(item._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-skyBlue' : 'text-teal'}`}>Users</h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsUserModalOpen(true)}
                        className={`${isDarkMode ? 'bg-lightTeal text-white' : 'bg-teal text-white'} py-2 px-6 rounded-full ${isDarkMode ? 'hover:bg-skyBlue' : 'hover:bg-lightTeal'} transition-all duration-300 shadow-lg mb-4`}
                    >
                        Add New User
                    </motion.button>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-2 px-4 text-left">Name</th>
                                    <th className="py-2 px-4 text-left">Email</th>
                                    <th className="py-2 px-4 text-left">Role</th>
                                    <th className="py-2 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id} className="border-b">
                                        <td className="py-2 px-4">{user.name}</td>
                                        <td className="py-2 px-4">{user.email}</td>
                                        <td className="py-2 px-4">{user.role}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="text-blue-500 hover:text-blue-700 mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-skyBlue' : 'text-teal'}`}>Items in Storage Over Time</h2>
                    <ItemsGraph items={items} />
                </section>
            </div>

            <RightSidebar
                isOpen={isRightSidebarOpen}
                onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            />

            <ItemModal
                isOpen={isItemModalOpen}
                onClose={() => setIsItemModalOpen(false)}
                onAddItem={handleAddItem}
            />
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                item={currentItem}
                onUpdateItem={handleUpdateItem}
            />
            <UserModal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                user={currentUser}
                onAddUser={handleAddUser}
                onUpdateUser={handleUpdateUser}
            />
            <Toaster position="bottom-right" />
        </div>
    );
};

const AdminDashboard = () => (
    <ThemeProvider>
        <MainAdmin />
    </ThemeProvider>
);

export default AdminDashboard;

