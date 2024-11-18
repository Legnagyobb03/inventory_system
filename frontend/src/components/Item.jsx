import React from 'react';

const Item = ({ item, onDelete, onEdit }) => {
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await onDelete(item._id);
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('Failed to delete item.');
            }
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-gray-800">Quantity: {item.quantity}</p>
            <p className="text-gray-800">Location: {item.location}</p>
            <div className="mt-4">
                <button
                    onClick={() => onEdit(item)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition mr-2"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Item;
