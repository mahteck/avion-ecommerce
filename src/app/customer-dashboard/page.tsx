'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
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
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    orders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Use next.js router for navigation

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        const userId = localStorage.getItem('userId'); // Retrieve logged-in user ID
        if (!userId) {
          setError('User not logged in');
          setLoading(false);
          router.push('/Signup'); // Redirect to signup page if user is not logged in
          return;
        }

        // Fetch user email using userId
        const userEmail = await client.fetch(
          `*[_type == "user" && _id == $userId][0].email`,
          { userId }
        );

        if (!userEmail) {
          setError('User email not found');
          setLoading(false);
          return;
        }

        // Fetch user profile and orders
        const [profile, orders] = await Promise.all([
          // Fetch user profile
          client.fetch(`*[_type == "user" && _id == $userId][0]{ name, email }`, { userId }),

          // Fetch orders by email
          client.fetch(
            `*[_type == "order" && customer._ref in *[_type == "customer" && email == $email]._id]{
              _id,
              trackingNumber,
              total,
              status,
              _createdAt
            } | order(_createdAt desc)`,
            { email: userEmail }
          ),
        ]);

        setCustomerData({
          name: profile.name,
          email: profile.email,
          orders,
        });

        setLoading(false); // Moved here to ensure it always executes after the data is fetched.
      } catch (err) {
        console.error('Error fetching customer data:', err);
        setError('Failed to load data. Please try again.');
        setLoading(false); // Ensure loading state is updated in case of an error.
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
        {/* Welcome Section */}
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome back, {customerData.name}!</h1>
          <p className="text-gray-600">Email: {customerData.email}</p>
        </div>

        {/* Order History Section */}
        <div className="bg-white shadow-xl rounded-lg p-6">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>
  {customerData.orders.length > 0 ? (
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
