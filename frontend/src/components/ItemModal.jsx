import React, { useState } from 'react';

const ItemModal = ({ isOpen, onClose, onAddItem }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const clearFields = () => {
        setName('');
        setDescription('');
        setQuantity(0);
        setLocation('');
        setError('');
        onClose(); // Close the modal after clearing fields
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        if (name === 'description') setDescription(value);
        if (name === 'quantity') setQuantity(value);
        if (name === 'location') setLocation(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (quantity <= 0) {
            setError('Quantity must be greater than 0.');
            return;
        }

        setError('');
        onAddItem({ name, description, quantity, location });

        clearFields();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-xl font-bold mb-4">Add New Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>

                    {/* Display error message if quantity is 0 */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={clearFields}
                            className="bg-gray-500 text-white py-1 px-4 rounded-md mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-1 px-4 rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemModal;
