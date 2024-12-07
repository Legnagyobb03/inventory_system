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
            className={`w-64 ${isDarkMode ? 'bg-darkTeal' : 'bg-white'} ${isDarkMode ? 'text-white' : 'text-gray-800'} p-6 flex flex-col h-screen`}
        >
            <h2 className="text-2xl font-bold mb-8">Inventory System</h2>
            
            <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full py-2 px-4 ${isDarkMode ? 'bg-teal text-white' : 'bg-gray-100 text-gray-800'} rounded-md focus:outline-none focus:ring-2 focus:ring-lightTeal`}
                    />
                    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <FaSearch className={isDarkMode ? 'text-skyBlue' : 'text-gray-500'} />
                    </button>
                </div>
            </form>

            <div className="mb-6">
                <select
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    className={`w-full py-2 px-4 ${isDarkMode ? 'bg-teal text-white' : 'bg-gray-100 text-gray-800'} rounded-md focus:outline-none focus:ring-2 focus:ring-lightTeal`}
                >
                    {locations.map((location) => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>

            <nav className="flex-grow">
                <ul className="space-y-4">
                    {menuItems.map((item, index) => (
                        <motion.li
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md ${isDarkMode ? 'hover:bg-teal' : 'hover:bg-gray-200'} transition-colors duration-300`}
                        >
                            <item.icon className={isDarkMode ? 'text-skyBlue' : 'text-gray-600'} />
                            <span>{item.text}</span>
                        </motion.li>
                    ))}
                </ul>
            </nav>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`flex items-center space-x-2 ${isDarkMode ? 'bg-teal text-white' : 'bg-gray-200 text-gray-800'} py-2 px-4 rounded-md ${isDarkMode ? 'hover:bg-lightTeal' : 'hover:bg-gray-300'} transition-colors duration-300 mb-4`}
            >
                {isDarkMode ? <FaMoon className="text-white" /> : <FaSun className="text-yellow-500" />}
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

