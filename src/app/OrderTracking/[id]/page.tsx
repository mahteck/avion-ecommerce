'use client';

import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';

// Define the type for order data
interface Order {
  _id: string;
  trackingNumber: string;
  _createdAt: string;
}

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const { id: trackingNumber } = params;
  const [orderData, setOrderData] = useState<Order | null>(null); // Explicitly type orderData
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      if (!trackingNumber) {
        setError('Tracking number is missing.');
        setLoading(false);
        return;
      }

      try {
        const order: Order | null = await client.fetch(
          `*[_type == "order" && trackingNumber == $trackingNumber][0]`,
          { trackingNumber }
        );

        if (!order) {
          setError('Order not found.');
        } else {
          setOrderData(order);
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order data.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [trackingNumber]);

  if (loading) {
    return <div className="text-center py-10">Loading order details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!orderData) {
    return <div className="text-center py-10">No order details available.</div>;
  }

  return (
    <div className="flex flex-col items-center px-4 py-6 min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Order Tracking</h1>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2 text-center">Order Summary</h2>
          <div className="text-gray-700 space-y-2">
            <p>
              <strong>Order ID:</strong> {orderData._id}
            </p>
            <p>
              <strong>Order Date:</strong> {new Date(orderData._createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Tracking Number:</strong> {orderData.trackingNumber}
            </p>
            <p>
              <strong>Estimated Delivery Date:</strong>{' '}
              {new Date(orderData._createdAt).toLocaleDateString()} {/* Adjust logic if needed */}
            </p>
          </div>
        </div>
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
