import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import Sidebar from './Sidebar';
import Item from './Item';
import ItemModal from './ItemModal';
import EditModal from './EditModal';
import { deleteItem, updateItem } from '../api';

const Main = () => {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                setItems(response.data || []);
            } catch (error) {
                console.error('Error fetching items:', error);
                alert('Failed to fetch items.');
            }
        };

        fetchItems();
    }, []); 

    // Handle adding a new item
    const handleAddItem = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
        setIsModalOpen(false); 
    };

    const handleUpdateItem = async (updatedItem) => {
        try {
            const response = await updateItem(updatedItem._id, updatedItem); 
            setItems((prevItems) =>
                prevItems.map((item) => (item._id === updatedItem._id ? response : item)) 
            );
            setIsEditModalOpen(false); 
        } catch (error) {
            console.error('Error updating item:', error);
            alert('Failed to update item.');
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteItem(id); // Call API to delete the item
            setItems((prevItems) => prevItems.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete item.');
        }
    };

    // Handle edit button click to open the edit modal
    const handleEditItem = (item) => {
        setCurrentItem(item); // Set the item being edited in the state
        setIsEditModalOpen(true); // Open the edit modal
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-4">Inventory Items</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition mb-4"
                >
                    Add New Item
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <Item
                                key={item._id || index} // Use _id as the key, or fallback to index if _id is not present
                                item={item}
                                onDelete={handleDeleteItem} // Pass the delete function as a prop
                                onEdit={handleEditItem} // Pass the edit function as a prop
                            />
                        ))
                    ) : (
                        <p>No items found.</p>
                    )}
                </div>
            </div>
            <ItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} // Close the modal when the close button is clicked
                onAddItem={handleAddItem} // Pass the add item function as a prop
            />
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)} // Close the edit modal when the close button is clicked
                item={currentItem} // Pass the current item being edited
                onUpdateItem={handleUpdateItem} // Pass the update item function as a prop
            />
        </div>
    );
};

export default Main;
