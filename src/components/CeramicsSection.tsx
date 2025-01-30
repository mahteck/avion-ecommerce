'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client'; // Import the Sanity client
import { useCart } from '@/context/CartContext';

type CeramicItem = {
    name: string;
    slug: string;
    image: { asset: { url: string } };
    price: number;
    description: string;
};

export default function Hero() {
    const [ceramics, setCeramics] = useState<CeramicItem[]>([]);
    const { cartItems, addToCart } = useCart(); // Ensure you access both cartItems and addToCart

    // Fetch ceramics products from Sanity based on category
    useEffect(() => {
        async function fetchCeramics() {
            try {
                const data = await client.fetch(`
                    *[_type == "product" && category->name == "Ceramics"]{
                        name,
                        "slug": slug.current,
                        image{
                            asset->{
                                url
                            }
                        },
                        price,
                        description
                    }[0..3] // Limit to 4 products
                `);
                setCeramics(data); // Set ceramics state with fetched data
            } catch (error) {
                console.error('Error fetching ceramics:', error);
            }
        }

        fetchCeramics(); // Call the function to fetch ceramics
    }, []);

    // Handle adding product to cart
    const handleAddToCart = (product: CeramicItem) => {
        const productWithQuantity = {
            ...product,
            id: parseInt(product.slug, 10) || 0, // Ensure id is a number
            quantity: 1,
            image: product.image.asset.url, // Assign image URL directly to image
            imageUrl: product.image.asset.url,
        };

        addToCart(productWithQuantity); // Add the product to the cart
    };

    return (
        <div>
            <section className="py-12">
                <h3 className="text-center text-xl font-bold mb-8">New Ceramics</h3>

                {/* Grid to display 4 boxes in one row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
                    {ceramics?.length > 0 ? (
                        ceramics.map((item) => (
                            <div
                                key={item.slug}
                                className="flex flex-col items-center text-center border p-4 rounded-md hover:bg-gray-100 transition-all duration-300"
                            >
                                <img
                                    src={item.image.asset.url}
                                    alt={item.name}
                                    width={250}
                                    height={250}
                                    className="w-full h-64 object-cover mb-4 rounded-md"
                                />
                                <h4 className="font-bold mb-2">{item.name}</h4>
                                <p className="text-gray-500 mb-2">{item.description}</p>
                                <p className="font-semibold text-lg">{item.price}</p>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-all duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Loading ceramics...</p>
                    )}
                </div>

                {/* Centered "View Collection" button */}
                <div className="text-center mt-6">
                    <Link href="/ProductListing">
                        <button className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-all duration-300">
                            View Collection
                        </button>
                    </Link>
                </div>
            </section>

            {/* Cart Display (Optional) */}

            {/* <div className="fixed bottom-0 left-0 p-4 bg-gray-800 text-white w-full">
                <div className="flex justify-between items-center">
                    <span>Cart: {cartItems.length} items</span>
                    <Link href="/cart">
                        <button className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-500">
                            Go to Cart
                        </button>
                    </Link>
                </div>
            </div> */}
        </div>
    );
}
