import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChartBar, FaCog, FaBoxOpen, FaSignOutAlt, FaSearch } from 'react-icons/fa';

const Sidebar = ({ onSearch, onFilterByLocation }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

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
            className="w-64 bg-darkTeal text-white p-6 flex flex-col h-screen"
        >
            <h2 className="text-2xl font-bold mb-8">Inventory System</h2>
            
            <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2 px-4 bg-teal text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lightTeal"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <FaSearch className="text-skyBlue" />
                    </button>
                </div>
            </form>

            <div className="mb-6">
                <select
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    className="w-full py-2 px-4 bg-teal text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lightTeal"
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
                            className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-teal transition-colors duration-300"
                        >
                            <item.icon className="text-skyBlue" />
                            <span>{item.text}</span>
                        </motion.li>
                    ))}
                </ul>
            </nav>
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

