'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDisplay() {
    const { cartItems } = useCart(); // Access cartItems from context
    const [showCart, setShowCart] = useState(true); // State to control visibility of cart notification

    // Hide the cart notification after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCart(false);
        }, 5000); // Hide after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showCart && (
                <div className="fixed top-0 left-0 w-full p-4 bg-green-600 text-white z-50 shadow-md transition-transform transform translate-y-0">
                    <div className="flex justify-between items-center max-w-screen-xl mx-auto">
                        <span className="text-lg font-semibold">
                            {cartItems.length} items in your cart
                        </span>
                        <div className="flex space-x-4">
                            <Link href="/Cart">
                                <button className="bg-green-700 px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300">
                                    Go to Cart
                                </button>
                            </Link>
                            {/* Close button */}
                            <button
                                onClick={() => setShowCart(false)}
                                className="bg-transparent text-white text-lg font-bold px-4 py-2 rounded-full hover:bg-green-800"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
