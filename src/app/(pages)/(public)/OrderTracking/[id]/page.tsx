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
  const { id: trackingNumberFromParams } = params;
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Log params for debugging
  useEffect(() => {
    console.log('Params:', params);
  }, [params]);

  // Update trackingNumber state when trackingNumberFromParams changes
  useEffect(() => {
    if (trackingNumberFromParams) {
      setTrackingNumber(trackingNumberFromParams);
    }
  }, [trackingNumberFromParams]);

  const fetchOrder = async (number: string) => {
    if (!number) {
      setError('Tracking number is missing.');
      setOrderData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const order: Order | null = await client.fetch(
        `*[_type == "order" && trackingNumber == $trackingNumber][0]`,
        { trackingNumber: number }
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
    } finally {
      setLoading(false);
    }
  };

  // Fetch order when page loads
  useEffect(() => {
    if (trackingNumberFromParams) {
      fetchOrder(trackingNumberFromParams);
    }
  }, [trackingNumberFromParams]);

  const calculateDeliveryDate = (orderDate: string): string => {
    const startDate = new Date(orderDate);
    let workingDays = 3;

    while (workingDays > 0) {
      startDate.setDate(startDate.getDate() + 1);
      const day = startDate.getDay();
      if (day !== 0 && day !== 6) {
        // Skip Sundays (0) and Saturdays (6)
        workingDays--;
      }
    }
    return startDate.toLocaleDateString();
  };

  const handleSearch = () => {
    fetchOrder(trackingNumber);
  };

  return (
    <div className="flex flex-col items-center px-4 py-6 min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Order Tracking</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tracking Input */}
          <div className="space-y-4">
            <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700">
              Enter Tracking Number
            </label>
            <input
              type="text"
              id="trackingNumber"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tracking number"
            />
            <div className="flex justify-between items-center space-x-4">
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
              >
                Search Order
              </button>
              <Link
                href="/customer-dashboard"
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {loading && <p className="text-center text-blue-500">Loading order details...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {orderData && (
              <>
                <h2 className="text-xl font-semibold text-center">Order Summary</h2>
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
                    <strong>Estimated Delivery Date:</strong> {calculateDeliveryDate(orderData._createdAt)}
                  </p>
                </div>
              </>
            )}

            <div className="mt-6 text-center">
              <Link href="/customer-dashboard" className="text-blue-600 hover:underline">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
