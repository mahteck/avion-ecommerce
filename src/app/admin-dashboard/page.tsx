'use client';
import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { IoMdCart, IoMdPeople, IoMdPricetag, IoMdSettings, IoIosLogOut } from 'react-icons/io';
import { HiCurrencyDollar } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [data, setData] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        totalSales: 0,
        recentOrders: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
                    return sum + (order.total || 0);
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

    const navigateTo = (route: string) => {
        router.push(route);
    };

    const handleLogout = () => {
        // Perform logout logic here, e.g., clearing authentication token or session
        console.log('Logging out...');
        // Redirect to login page
        router.push('/Login');
    };

    if (loading) {
        return <div className="text-center py-10">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`w-${sidebarCollapsed ? '20' : '64'} bg-gray-800 text-white h-screen p-6 transition-all duration-300`}>
                <div className="flex justify-between items-center mb-8">
                    {/* Conditional rendering of title based on collapsed state */}
                    {!sidebarCollapsed && (
                        <h1 className="text-3xl font-extrabold text-gray-200">Admin Panel</h1>
                    )}
                    <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="text-white">
                        {sidebarCollapsed ? '☰' : '✖'}
                    </button>
                </div>
                <ul>
                    <li className="mb-6 cursor-pointer" onClick={() => navigateTo('/admin/dashboard')}>
                        <IoMdCart size={24} className="inline mr-4" />
                        {!sidebarCollapsed && 'Dashboard'}
                    </li>
                    <li className="mb-6 cursor-pointer" onClick={() => navigateTo('/admin/products')}>
                        <IoMdPricetag size={24} className="inline mr-4" />
                        {!sidebarCollapsed && 'Product Listing'}
                    </li>
                    <li className="mb-6 cursor-pointer" onClick={() => navigateTo('/admin/orders')}>
                        <IoMdCart size={24} className="inline mr-4" />
                        {!sidebarCollapsed && 'Orders List'}
                    </li>
                    <li className="mb-6 cursor-pointer" onClick={() => navigateTo('/admin/users')}>
                        <IoMdPeople size={24} className="inline mr-4" />
                        {!sidebarCollapsed && 'Users'}
                    </li>
                    <li className="mb-6 cursor-pointer" onClick={() => navigateTo('/admin/customers')}>
                        <IoMdPeople size={24} className="inline mr-4" />
                        {!sidebarCollapsed && 'Customers'}
                    </li>
                    <li className="mb-6 cursor-pointer" onClick={() => navigateTo('/admin/roles')}>
                        <IoMdSettings size={24} className="inline mr-4" />
                        {!sidebarCollapsed && 'Role Management'}
                    </li>
                    <li className="mt-6 cursor-pointer text-red-500" onClick={handleLogout}>
                        <IoIosLogOut size={24} className="inline mr-4" />
                        {!sidebarCollapsed && 'Logout'}
                    </li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Admin Dashboard</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex items-center p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                        <IoMdCart size={32} className="text-blue-600 mr-6" />
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">{data.totalOrders}</h2>
                            <p className="text-lg text-gray-500">Total Orders</p>
                        </div>
                    </div>
                    <div className="flex items-center p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                        <IoMdPricetag size={32} className="text-green-600 mr-6" />
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">{data.totalProducts}</h2>
                            <p className="text-lg text-gray-500">Total Products</p>
                        </div>
                    </div>
                    <div className="flex items-center p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                        <IoMdPeople size={32} className="text-purple-600 mr-6" />
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">{data.totalUsers}</h2>
                            <p className="text-lg text-gray-500">Total Users</p>
                        </div>
                    </div>
                    <div className="flex items-center p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                        <HiCurrencyDollar size={32} className="text-yellow-500 mr-6" />
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">${data.totalSales.toFixed(2)}</h2>
                            <p className="text-lg text-gray-500">Total Sales</p>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border-collapse">
                            <thead>
                                <tr className="text-gray-600 border-b">
                                    <th className="py-3 px-6">Order ID</th>
                                    <th className="py-3 px-6">Customer</th>
                                    <th className="py-3 px-6">Total</th>
                                    <th className="py-3 px-6">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentOrders.map((order: any) => (
                                    <tr key={order._id || 'N/A'} className="text-gray-800 border-b hover:bg-gray-50">
                                        <td className="py-3 px-6">{order.trackingNumber || 'N/A'}</td>
                                        <td className="py-3 px-6">{order.customer.name || 'Unknown'}</td>
                                        <td className="py-3 px-6">
                                            {order.total ? order.total.toFixed(2) : '0.00'}
                                        </td>
                                        <td className="py-3 px-6">{order.status || 'Pending'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
