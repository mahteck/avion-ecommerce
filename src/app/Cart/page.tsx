'use client'

import { useCart } from "@/context/CartContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Cart() {
    const { cartItems, removeFromCart } = useCart(); // Use cartItems dynamically
    const [isClient, setIsClient] = useState(false);
    const [shippingCharges, setShippingCharges] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);

        const fetchShippingCharges = async () => {
            try {
                const response = await fetch("/api/shipment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ weight: 10, distance: 100 }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch shipping charges");
                }

                const data = await response.json();
                if (data.rates) {
                    setShippingCharges(parseFloat(data.rates.charges));
                } else {
                    throw new Error("No rates found in the response");
                }
            } catch (error) {
                console.error("Error fetching shipping charges:", error);
                setError("Failed to fetch shipping charges. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchShippingCharges();
    }, [cartItems]);

    const calculateTotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const grandTotal = calculateTotal() + shippingCharges;

    const handleCheckout = () => {
        if (isClient) {
            sessionStorage.setItem("cart", JSON.stringify(cartItems)); // Save cartItems to session
            sessionStorage.setItem("total", grandTotal.toString()); // Save grand total to session
            router.push("/Checkout");
        }
    };

    return (
        <div className="w-full px-4 py-8">
            <div className="p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-left mb-6 text-gray-800">
                    Your Shopping Cart
                </h2>

                {/* Cart Items */}
                <div className="space-y-6">
                    {cartItems.length > 0 ? (
                        <>
                            {/* Table Header for Grid */}
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center font-semibold text-gray-700 border-b pb-4">
                                <div>Product</div>
                                <div>Quantity</div>
                                <div>Price</div>
                                <div>Actions</div>
                            </div>

                            {/* Cart Items List */}
                            {cartItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center"
                                >
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.image || "/images/default.png"}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-md border border-gray-100"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right text-gray-800">
                                        {item.quantity}
                                    </div>
                                    <div className="text-right text-gray-800">
                                        £{(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => removeFromCart(item.name)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <p className="text-center text-gray-600">Your cart is empty.</p>
                    )}
                </div>

                {/* Subtotal Section */}
                <div className="mt-10 text-center lg:text-right">
                    <h1 className="inline text-lg sm:text-xl font-medium mr-4 text-gray-600">
                        Subtotal
                    </h1>
                    <h1 className="inline text-xl sm:text-2xl font-semibold">
                        £{calculateTotal().toFixed(2)}
                    </h1>
                    <p className="text-sm mt-4">
                        Taxes and shipping are calculated at checkout
                    </p>
                    <br />
                    <button
                        onClick={handleCheckout}
                        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Go to checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
