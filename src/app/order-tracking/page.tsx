'use client';

import { client } from '@/sanity/lib/client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Order {
  _id: string;
  _createdAt: string;
  trackingNumber: string;
  [key: string]: any;
}

function OrderTrackingComponent() {
  const searchParams = useSearchParams(); // Access query parameters
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Pre-fill tracking number from query params if available
    const preFilledTrackingNumber = searchParams.get('trackingNumber');
    if (preFilledTrackingNumber) {
      setTrackingNumber(preFilledTrackingNumber);
      fetchOrderData(preFilledTrackingNumber);
    }
  }, [searchParams]);

  const fetchOrderData = async (tracking: string) => {
    setLoading(true);
    setError(null);

    try {
      const orderQuery = `*[_type == "order" && trackingNumber == $trackingNumber][0]`;
      const order: Order | null = await client.fetch(orderQuery, { trackingNumber });

      if (!order) {
        setError('Order not found');
        setOrderData(null);
      } else {
        setOrderData(order);
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('An error occurred while fetching the order.');
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) {
      setError('Please enter a tracking number');
      return;
    }

    fetchOrderData(trackingNumber);
  };

  const addWorkingDays = (date: Date, days: number): Date => {
    let result = new Date(date);
    let addedDays = 0;

    while (addedDays < days) {
      result.setDate(result.getDate() + 1);
      if (result.getDay() !== 0 && result.getDay() !== 6) {
        addedDays++;
      }
    }

    return result;
  };

  return (
    <div className="flex flex-col items-center px-4 py-6 min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Order Tracking</h1>
        <form onSubmit={handleTrackOrder} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter your tracking number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Track Order'}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {orderData && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-center">Order Summary</h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Order Date:</strong> {new Date(orderData._createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Tracking Number:</strong> {orderData.trackingNumber}
              </p>
              <p>
                <strong>Estimated Delivery Date:</strong>{' '}
                {addWorkingDays(new Date(orderData._createdAt), 3).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading Order Tracking...</div>}>
      <OrderTrackingComponent />
    </Suspense>
  );
}
