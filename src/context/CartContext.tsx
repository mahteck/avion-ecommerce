'use client'

import React, { createContext, useContext, useState, useEffect } from "react";

// Define CartItem and CartContextType interfaces
export interface CartItem {
    id: number;
    description: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    weight?: number;
    imageUrl?: string;
}

export interface CartContextType {
    cartItems: CartItem[];  // cartItems is the name used
    addToCart: (item: CartItem) => void;
    removeFromCart: (name: string) => void;
    updateCartItem: (updatedItem: CartItem[]) => void; // Adding the updateCartItem method
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart items from localStorage if available
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            setCartItems(savedCart ? JSON.parse(savedCart) : []);
        } catch (error) {
            console.error("Error parsing cart data from localStorage:", error);
            setCartItems([]); // Reset to an empty cart on error
        }
    }, []);

    // Function to add an item to the cart
    const addToCart = (item: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = [...prevCartItems, item];
            localStorage.setItem('cart', JSON.stringify(updatedCartItems)); // Save to localStorage
            return updatedCartItems;
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (name: string) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(item => item.name !== name);
            localStorage.setItem('cart', JSON.stringify(updatedCartItems)); // Save to localStorage
            return updatedCartItems;
        });
    };

    // Function to update an item in the cart (e.g., change quantity)
    const updateCartItem = (updatedCartItems: CartItem[]) => {
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems)); // Save to localStorage
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to access the CartContext
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
