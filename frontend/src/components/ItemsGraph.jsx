import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ItemsGraph = ({ items }) => {
    const graphData = useMemo(() => {
        const today = new Date();
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const formattedDate = date.toISOString().split('T')[0];
            const itemCount = items.filter(item => {
                const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
                return itemDate <= formattedDate;
            }).length;
            data.push({ date: formattedDate, count: itemCount });
        }
        return data;
    }, [items]);

    return (
        <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Items in Storage Over Time</h3>
            <p className="text-sm text-gray-600 mb-4">Number of items in storage for the last 7 days</p>
            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" name="Item Count" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ItemsGraph;

