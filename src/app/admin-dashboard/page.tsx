'use client';
import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { IoMdCart, IoMdPeople, IoMdPricetag } from 'react-icons/io';
import { HiCurrencyDollar } from 'react-icons/hi';

export default function AdminDashboard() {
    const [data, setData] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        totalSales: 0,
        recentOrders: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [products, users, orders] = await Promise.all([
                    client.fetch(`count(*[_type == "product"])`),
                    client.fetch(`count(*[_type == "user"])`),
                    client.fetch(`*[_type == "order"] | order(_createdAt desc) [0...5] {
                                _id,
                                orderId,
                                trackingNumber,
                                total,
                                customer->{
                                    _id,
                                    name,
                                    email
                                },
                                _createdAt
                                }`),
                ]);

                const totalSales = orders.reduce((sum: number, order: any) => {
                    return sum + (order.totalAmount || 0);
                }, 0);

                setData({
                    totalOrders: orders.length,
                    totalProducts: products,
                    totalUsers: users,
                    totalSales,
                    recentOrders: orders,
                });
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
                setError('Failed to load data. Please try again.');
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center p-4 bg-white shadow rounded-lg">
                    <IoMdCart size={28} className="text-blue-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">{data.totalOrders}</h2>
                        <p className="text-sm text-gray-500">Total Orders</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white shadow rounded-lg">
                    <IoMdPricetag size={28} className="text-green-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">{data.totalProducts}</h2>
                        <p className="text-sm text-gray-500">Total Products</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white shadow rounded-lg">
                    <IoMdPeople size={28} className="text-purple-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">{data.totalUsers}</h2>
                        <p className="text-sm text-gray-500">Total Users</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white shadow rounded-lg">
                    <HiCurrencyDollar size={28} className="text-yellow-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">${data.totalSales.toFixed(2)}</h2>
                        <p className="text-sm text-gray-500">Total Sales</p>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            {/* Recent Orders */}
<div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Orders</h2>
    <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
            <thead>
                <tr>
                    <th className="border-b py-2 px-4 text-gray-600">Order ID</th>
                    <th className="border-b py-2 px-4 text-gray-600">Customer</th>
                    <th className="border-b py-2 px-4 text-gray-600">Total</th>
                    <th className="border-b py-2 px-4 text-gray-600">Status</th>
                </tr>
            </thead>
            <tbody>
                {data.recentOrders.map((order: any) => (
                    <tr key={order._id || 'N/A'} className="text-sm">
                        <td className="border-b py-2 px-4">{order.trackingNumber || 'N/A'}</td>
                        <td className="border-b py-2 px-4">{order.customer.name || 'Unknown'}</td>
                        <td className="border-b py-2 px-4">
                            {order.total ? order.total.toFixed(2) : '0.00'}
                        </td>
                        <td className="border-b py-2 px-4">{order.status || 'Pending'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

        </div>
    );
}
