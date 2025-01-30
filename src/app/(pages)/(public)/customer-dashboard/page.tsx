'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Order {
  _id: string;
  trackingNumber: string;
  total: number;
  status: string;
  _createdAt: string;
}

interface CustomerData {
  name: string;
  email: string;
  orders: Order[];
}

export default function CustomerDashboard() {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`); // Fetch from the new API route

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/signup'); // Redirect if user is not logged in
          }
          throw new Error(await response.text());
        }

        const data = await response.json();
        setCustomerData({
          name: data.profile.name,
          email: data.profile.email,
          orders: data.orders,
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching customer data:', err);
        setError('Failed to load data. Please try again.');
        setLoading(false);
      }
    }

    fetchCustomerData();
  }, [router]);

  if (loading) {
    return <div className="text-center py-10">Loading your dashboard...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error} <br />
        <Link href="/signup" className="text-blue-500 underline">Go to Signup</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome back, {customerData?.name}!</h1>
          <p className="text-gray-600">Email: {customerData?.email}</p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>
          {customerData?.orders.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="text-sm font-medium text-gray-600 border-b">
                    <th className="py-2 px-4">Order ID</th>
                    <th className="py-2 px-4">Total</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customerData.orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="py-2 px-4">{order.trackingNumber}</td>
                      <td className="py-2 px-4">{order.total.toFixed(2)}</td>
                      <td className="py-2 px-4">{order.status}</td>
                      <td className="py-2 px-4">{new Date(order._createdAt).toLocaleDateString()}</td>
                      <td className="py-2 px-4">
                        <Link
                          href={`/OrderTracking/${order.trackingNumber}`}
                          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition"
                        >
                          Track Order
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">You have no orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
