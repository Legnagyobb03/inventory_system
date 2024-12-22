import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChartBar, FaCog, FaBoxOpen, FaSignOutAlt, FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from './ThemeProvider';

const Sidebar = ({ onSearch, onFilterByLocation }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const { isDarkMode, toggleTheme } = useTheme();

    const handleLogout = () => {
        console.log("User logged out");
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleLocationChange = (e) => {
        const location = e.target.value;
        setSelectedLocation(location);
        onFilterByLocation(location);
    };

    const menuItems = [
        { icon: FaChartBar, text: 'Dashboard' },
        { icon: FaBoxOpen, text: 'Items' },
        { icon: FaChartBar, text: 'Reports' },
        { icon: FaCog, text: 'Settings' },
    ];

    const locations = ['All', 'Section A', 'Section B', 'Section C', 'Section D'];

    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className={`fixed top-0 left-0 w-64 h-full ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            } p-6 flex flex-col shadow-lg z-50`}
        >
            <motion.h2 
                className="text-2xl font-bold mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                Inventory System
            </motion.h2>

            <motion.form 
                onSubmit={handleSearch} 
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full py-2 px-4 ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <FaSearch className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    </button>
                </div>
            </motion.form>

            <motion.div 
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <select
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    className={`w-full py-2 px-4 ${
                        isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                    {locations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
            </motion.div>

            <nav className="flex-grow">
                <ul className="space-y-4">
                    {menuItems.map((item, index) => (
                        <motion.li
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md ${
                                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                            } transition-colors duration-300`}
                        >
                            <item.icon className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                            <span>{item.text}</span>
                        </motion.li>
                    ))}
                </ul>
            </nav>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`flex items-center space-x-2 ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                } py-2 px-4 rounded-md ${
                    isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'
                } transition-colors duration-300 mb-4`}
            >
                {isDarkMode ? <FaMoon className="text-yellow-300" /> : <FaSun className="text-yellow-500" />}
                <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="mt-auto flex items-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
            >
                <FaSignOutAlt />
                <span>Logout</span>
            </motion.button>
        </motion.div>
    );
};

export default Sidebar;
