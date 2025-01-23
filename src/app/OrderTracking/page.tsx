'use client';

import React, { useState } from 'react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';

// Define the type for order data
interface Order {
  _id: string;
  trackingNumber: string;
  _createdAt: string;
}

export default function OrderTrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderData, setOrderData] = useState<Order | null>(null); // Correctly typed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a valid tracking number.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const order: Order | null = await client.fetch(
        `*[_type == "order" && trackingNumber == $trackingNumber][0]`,
        { trackingNumber }
      );

      if (!order) {
        setError('Order not found.');
        setOrderData(null);
      } else {
        setOrderData(order);
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Failed to load order data.');
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-6 min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Order Tracking</h1>

        {/* Input Field for Tracking Number */}
        <div className="mb-4">
          <label htmlFor="trackingNumber" className="block text-gray-700 font-medium mb-2">
            Enter Tracking Number
          </label>
          <input
            type="text"
            id="trackingNumber"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Track Order
          </button>
        </div>

        {loading && <div className="text-center py-10">Loading order details...</div>}
        {error && <div className="text-center py-10 text-red-500">{error}</div>}

        {/* Display Order Details */}
        {orderData && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-center">Order Summary</h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Order ID:</strong> {orderData?._id}
              </p>
              <p>
                <strong>Order Date:</strong>{' '}
                {orderData?._createdAt
                  ? new Date(orderData._createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                <strong>Tracking Number:</strong> {orderData?.trackingNumber}
              </p>
              <p>
                <strong>Estimated Delivery Date:</strong>{' '}
                {orderData?._createdAt
                  ? new Date(orderData._createdAt).toLocaleDateString()
                  : 'N/A'}{' '}
              </p>
            </div>
          </div>
        )}

        <Link
          href="/customer-dashboard"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition block text-center"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
