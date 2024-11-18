import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Item from './Item';
import ItemModal from './ItemModal';
import axios from 'axios';

const MainAdmin = () => {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/items');
                if (Array.isArray(response.data)) {
                    setItems(response.data);
                } else {
                    console.error('Expected an array but received:', response.data);
                    setItems([]);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
                setItems([]);
            }
        };

        fetchItems();
    }, []);

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
        setIsModalOpen(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-4">Inventory Items</h1>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                    Add Item
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {items.map(item => (
                        <Item key={item._id} name={item.name} description={item.description} />
                    ))}
                </div>
                <ItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddItem={handleAddItem} />
            </div>
        </div>
    );
};

export default MainAdmin;