'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

// Define the CartItem type
type CartItem = {
    name: string;
    price: number;
    quantity: number;
};

export default function CheckoutPage() {
    const [isClient, setIsClient] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [customerName, setCustomerName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [shippingAddress, setShippingAddress] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [total, setTotal] = useState<number>(0);

    const router = useRouter();

    useEffect(() => {
        setIsClient(true);

        const savedCart = sessionStorage.getItem('cart');
        setCartItems(savedCart ? JSON.parse(savedCart) : []);

        const savedTotal = sessionStorage.getItem('total');
        setTotal(savedTotal ? parseFloat(savedTotal) : 0);
    }, []);

    const handlePlaceOrder = async () => {
        if (!customerName.trim()) {
            alert('Please enter your name.');
            return;
        }

        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!phone.trim() || !/^\d{10,15}$/.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        if (!shippingAddress.trim()) {
            alert('Please provide a shipping address.');
            return;
        }

        if (!paymentMethod.trim()) {
            alert('Please select a payment method.');
            return;
        }

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        try {
            const orderDetails = {
                customerName,
                email,
                phone,
                shippingAddress,
                paymentMethod,
                cartItems,
                total,
            };

            const response = await fetch('/api/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            if (response.ok) {
                const result = await response.json();
                const trackingNumber = result.trackingNumber || `TRK-${Math.floor(Math.random() * 1000000)}`;

                const confirmationDetails = {
                    customerName,
                    email,
                    phone,
                    cartItems: result.cartItems || cartItems,
                    total: result.total || total,
                    trackingNumber,
                };

                sessionStorage.setItem('orderDetails', JSON.stringify(confirmationDetails));
                sessionStorage.removeItem('cart');
                setCartItems([]);
                setTotal(0);

                setTimeout(() => {
                    router.push('/order-confirmation');
                }, 500);
            } else {
                const errorData = await response.json();
                console.error('Error placing order:', errorData.message || response.statusText);
                alert(errorData.message || 'Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    if (!isClient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Checkout</h1>

            {/* Customer Details */}
            <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Customer Details</h2>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            {/* Shipping Address */}
            <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Shipping Address</h2>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter your shipping address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    rows={4}
                />
            </div>

            {/* Payment Method */}
            <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Payment Method</h2>
                <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="">Select Payment Method</option>
                    <option value="credit">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cod">Cash on Delivery</option>
                </select>
            </div>

            {/* Cart Items */}
            <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Your Cart</h2>
                <div className="border p-4 rounded-lg overflow-x-auto">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-600">Your cart is empty.</p>
                    ) : (
                        <table className="w-full text-left table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-2 sm:px-4 py-2 text-sm font-medium">Product</th>
                                    <th className="border px-2 sm:px-4 py-2 text-sm font-medium">Price</th>
                                    <th className="border px-2 sm:px-4 py-2 text-sm font-medium">Quantity</th>
                                    <th className="border px-2 sm:px-4 py-2 text-sm font-medium">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-2 sm:px-4 py-2">{item.name}</td>
                                        <td className="border px-2 sm:px-4 py-2">${item.price.toFixed(2)}</td>
                                        <td className="border px-2 sm:px-4 py-2">{item.quantity}</td>
                                        <td className="border px-2 sm:px-4 py-2">${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Total */}
            <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Order Summary</h2>
                <div className="border p-4 rounded-lg">
                    <p className="text-lg">Total: ${total.toFixed(2)}</p>
                    <button
                        className="mt-4 w-full sm:w-auto px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
