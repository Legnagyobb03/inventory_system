import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("User  logged out");
        navigate('/login');
    };

    return (
        <div className="w-64 bg-primary p-6 border-r border-gray-300">
            <h2 className="text-2xl font-semibold mb-6">Inventory System</h2>
            <ul className="space-y-4">
                <li className="text-lg hover:text-accent cursor-pointer">Dashboard</li>
                <li className="text-lg hover:text-accent cursor-pointer">Items</li>
                <li className="text-lg hover:text-accent cursor-pointer">Reports</li>
                <li className="text-lg hover:text-accent cursor-pointer">Settings</li>
            </ul>
            <button 
                onClick={handleLogout} 
                className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;