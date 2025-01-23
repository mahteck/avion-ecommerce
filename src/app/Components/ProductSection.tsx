'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client } from '@/sanity/lib/client'; // Import the Sanity client
import { useCart } from '@/context/CartContext'; // Import useCart from your context

type ProductItem = {
    name: string;
    slug: string;
    image: { asset: { url: string } };
    price: number;
    description: string;
    category: { name: string };
};

export default function ProductSection() {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const { addToCart } = useCart(); // Access addToCart function

    // Fetch top 3 products from different categories
    useEffect(() => {
        async function fetchTopProducts() {
            try {
                const data = await client.fetch(`
                    *[_type == "product"]{
                        name,
                        "slug": slug.current,
                        image{
                            asset->{
                                url
                            }
                        },
                        price,
                        description,
                        category->{
                            name
                        }
                    }[0..2] // Limit to top 3 products across categories
                `);
                setProducts(data); // Set products state with fetched data
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchTopProducts(); // Call the function to fetch top products
    }, []);

    // Handle adding product to cart
    const handleAddToCart = (product: ProductItem) => {
        const productWithQuantity = {
            id: Number(new Date()), // Generate a unique number ID based on current timestamp
            quantity: 1, // Default quantity, can be adjusted
            imageUrl: product.image.asset.url, // Map image URL
            name: product.name,
            slug: product.slug,
            image: product.image.asset.url, // Directly assign image URL to match CartItem format
            price: product.price,
            description: product.description,
            category: product.category, // Optional: If you want to preserve category
        };

        addToCart(productWithQuantity); // Add the product to the cart
    };

    return (
        <section className="py-12 bg-gray-50">
            <h3 className="text-center text-xl font-bold mb-8">Our Popular Products</h3>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
                {products?.length > 0 ? (
                    products.map((product, index) => (
                        <div
                            key={product.slug}
                            className={`border p-4 rounded-md hover:bg-gray-100 transition-all duration-300 ${index === 0 ? 'lg:col-span-2' : ''}`} // Make first product span across two columns
                        >
                            <img
                                src={product.image.asset.url}
                                alt={product.name}
                                className="w-full object-cover h-64 mb-4 rounded-md"
                            />
                            <h4 className="text-lg font-bold mb-2">{product.name}</h4>
                            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                            <p className="text-gray-900 font-semibold text-lg">{product.price}</p>

                            {/* Add to Cart Button */}
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-all duration-300"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Loading popular products...</p>
                )}
            </div>

            {/* Centered View Collection Button */}
            <div className="text-center mt-6">
                <Link href={"/ProductListing"}>
                    <button className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-all duration-300">
                        View Collection
                    </button>
                </Link>
            </div>
        </section>
    );
}
