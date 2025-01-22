'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';

// Define Order and Product interfaces
interface Order {
    _id: string;
    trackingNumber: string;
    total: number;
    status: string;
    _createdAt: string;
}

interface Product {
    _id: string;
    title: string;
    price: number;
}

interface CustomerData {
    name: string;
    email: string;
    orders: Order[];
    wishlist: Product[];
}

export default function CustomerDashboard() {
    const [customerData, setCustomerData] = useState<CustomerData>({
        name: '',
        email: '',
        orders: [],
        wishlist: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCustomerData() {
            try {
                // Ensure that userId is correctly stored and accessible in localStorage
                const userId = localStorage.getItem('userId');
                console.log('userId:', userId);

                if (!userId) {
                    setError('User not logged in');
                    setLoading(false);
                    return;
                }

                const userEmail = await client.fetch(
                    `*[_type == "user" && _id == $userId][0].email`,
                    { userId }
                );
                console.log(userEmail);

                const [profile, orders, wishlist] = await Promise.all([
                    // Fetch customer profile using userId
                    client.fetch(`*[_type == "user" && _id == $userId][0]{ name, email }`, { userId }),

                    // Fetch orders using customer._id
                    // client.fetch(
                    //     `*[_type == "order" && customer._ref == $userId]{ _id, trackingNumber, total, status, _createdAt } | order(_createdAt desc)`,
                    //     { userId }
                    // ),

                    // client.fetch(
                    //     `*[_type == "order" && (user._ref == $userId || customer._ref == $userId)]{ _id, trackingNumber, total, status, _createdAt } | order(_createdAt desc)`,
                    //     { userId }
                    // ),

                    client.fetch(
                        `*[_type == "order" && customer._ref in *[_type == "user" && email in *[_type == "user" && email == $email].email]._id]{ 
                            _id, 
                            trackingNumber, 
                            total, 
                            status, 
                            _createdAt 
                        } | order(_createdAt desc)`,
                        { email: userEmail }
                    ),

                    // Fetch wishlist using userId
                    client.fetch(
                        `*[_type == "product" && _id in *[_type == "wishlist" && userId == $userId].productId]{ _id, title, price }`,
                        { userId }
                    ),
                ]);

                setCustomerData({
                    name: profile.name,
                    email: profile.email,
                    orders,
                    wishlist,
                });

                setLoading(false);
            } catch (err) {
                setError('Failed to load data. Please try again.');
                setLoading(false);
            }
        }

        fetchCustomerData();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading your dashboard...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="bg-white shadow-xl rounded-lg p-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Welcome back, {customerData.name}!</h1>
                    <p className="text-gray-600">Email: {customerData.email}</p>
                </div>

                {/* Order History */}
                <div className="bg-white shadow-xl rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>
                    {customerData.orders.length > 0 ? (
                        <table className="w-full text-left table-auto">
                            <thead>
                                <tr className="text-sm font-medium text-gray-600 border-b">
                                    <th className="py-2 px-4">Order ID</th>
                                    <th className="py-2 px-4">Total</th>
                                    <th className="py-2 px-4">Status</th>
                                    <th className="py-2 px-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerData.orders.map((order) => (
                                    <tr key={order._id} className="border-b">
                                        <td className="py-2 px-4">{order.trackingNumber}</td>
                                        <td className="py-2 px-4">${order.total.toFixed(2)}</td>
                                        <td className="py-2 px-4">{order.status}</td>
                                        <td className="py-2 px-4">{new Date(order._createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">You have no orders yet.</p>
                    )}
                </div>

                {/* Wishlist */}
                <div className="bg-white shadow-xl rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Wishlist</h2>
                    {customerData.wishlist.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {customerData.wishlist.map((product) => (
                                <div
                                    key={product._id}
                                    className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                                    <Link href={`/product/${product._id}`} className="text-blue-600 hover:underline">
                                        View Product
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Your wishlist is empty.</p>
                    )}
                </div>

                {/* Profile Overview */}
                <div className="bg-white shadow-xl rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Overview</h2>
                    <p className="text-gray-600">Name: {customerData.name}</p>
                    <p className="text-gray-600">Email: {customerData.email}</p>
                    <Link href="/ProfileEdit" className="text-blue-600 hover:underline mt-4 inline-block">
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
