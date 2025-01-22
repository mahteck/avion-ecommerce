'use client';

import { client } from '@/sanity/lib/client';
import React, { useEffect, useState } from 'react';

// Define the type for order details
interface OrderDetails {
    cartItems: { name: string; price: number; quantity: number }[];
    total: number;
    trackingNumber: string;
    customerName: string;
    email: string;
    phone: string;
    status: string;
}

export default function OrderConfirmationPage() {
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

    useEffect(() => {
        // Retrieve order details from session storage
        const savedOrderDetails = sessionStorage.getItem('orderDetails');
        if (savedOrderDetails) {
            setOrderDetails(JSON.parse(savedOrderDetails));
        }
    }, []);

    useEffect(() => {
        if (orderDetails) {
            saveOrderToSanity(orderDetails);
        }
    }, [orderDetails]);

    const saveOrderToSanity = async (orderDetails: OrderDetails) => {
        try {
            // Check if customer already exists
            const customerQuery = `*[_type == "user" && email == $email][0]`;
            const existingCustomer = await client.fetch(customerQuery, {
                email: orderDetails.email,
            });

            // If customer exists, use the existing customer ID
            let customerId = existingCustomer?._id;
            
            // If not, create a new customer
            if (!customerId) {
                const customerDoc = {
                    _type: 'user',
                    name: orderDetails.customerName,
                    email: orderDetails.email,
                    phone: orderDetails.phone,
                };
                const createdCustomer = await client.create(customerDoc);
                customerId = createdCustomer._id;
            }

            // Create the order document
            const orderDoc = {
                _type: 'order',
                trackingNumber: orderDetails.trackingNumber,
                total: orderDetails.total,
                customer: { _type: 'reference', _ref: customerId },  // Reference to customer (existing or newly created)
                cartItems: orderDetails.cartItems.map((item) => ({
                    _type: 'cartItem',
                    _key: Math.random().toString(36).substring(7), // Generates a unique key
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    status: 'pending',
                })),
            };

            await client.create(orderDoc);
            //console.log('Order saved to Sanity successfully!');
        } catch (error) {
            //console.error('Error saving order to Sanity:', error);
        }
    };

    if (!orderDetails) {
        return <div className="text-center mt-10 text-gray-500">Loading order details...</div>;
    }

    const { cartItems, total, trackingNumber, customerName, email, phone } = orderDetails;

    if (!cartItems || cartItems.length === 0) {
        return <div className="text-center mt-10 text-gray-500">No items found in your order. Please try again.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-green-600 text-center">Thank You for Your Order!</h1>
            <p className="text-base sm:text-lg mb-4 text-center">Your order has been placed successfully. Below are the details of your order:</p>

            <div className="space-y-6">
                {/* Customer Information */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Customer Information:</h2>
                    <p><strong>Name:</strong> {customerName}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Phone:</strong> {phone}</p>
                </div>

                {/* Tracking Number */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Tracking Number:</h2>
                    <p className="text-base sm:text-lg text-gray-700 break-words">{trackingNumber}</p>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Order Summary:</h2>
                    <ul className="space-y-3">
                        {cartItems.map((item, index) => (
                            <li key={index} className="text-base sm:text-lg text-gray-700">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                    <span className="font-medium">{item.name}</span>
                                    <span>{item.price} x {item.quantity}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Total */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">Total:</h2>
                    <p className="text-base sm:text-lg text-gray-700">${total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}
