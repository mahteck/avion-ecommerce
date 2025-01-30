'use client';

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Product {
    id: number;
    name: string;
    description: string;
    dimensions: string | { [key: string]: string }; // Handle both string or object formats
    features: string[];
    imageUrl: string;
    price: number;
    tags: string;
    category?: { name: string };
}

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    // Parse dimensions
    let dimensionsArray: { key: string; value: string }[] = [];
    if (typeof product.dimensions === "string") {
        try {
            dimensionsArray = JSON.parse(product.dimensions);
        } catch {
            console.error("Invalid dimensions string format");
        }
    } else if (typeof product.dimensions === "object") {
        dimensionsArray = Object.entries(product.dimensions).map(([key, value]) => ({
            key,
            value,
        }));
    }

    // Extract height, width, and depth
    const height = dimensionsArray.find((d) => d.key.toLowerCase() === "height")?.value || "Minimum Height: 10cm";
    const width = dimensionsArray.find((d) => d.key.toLowerCase() === "width")?.value || "Minimum Width: 10cm";
    const depth = dimensionsArray.find((d) => d.key.toLowerCase() === "depth")?.value || "Minimum Depth: 10cm";

    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    // const handleAddToCart = () => {
    //     const productWithQuantity = { ...product, quantity };
    //     addToCart(productWithQuantity);
    // };

    const handleAddToCart = () => {
        const productWithQuantity = {
            ...product,
            quantity,
            image: product.imageUrl, // Map imageUrl to image
        };
    
        addToCart(productWithQuantity);
    };

    return (
        <div className="bg-gray-50">
            {/* Main Product Section */}
            <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-6 items-start">
                {/* Product Image */}
                <div className="relative w-full">
                    {product.imageUrl ? (
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="rounded-lg object-cover mx-auto"
                        />
                    ) : (
                        <p className="text-center text-gray-500">No image available</p>
                    )}
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800">{product.name || "Product Name"}</h1>
                    <p className="text-2xl text-purple-900">PKR {product.price || "Price"}</p>
                    <p className="text-gray-600 leading-relaxed">
                        {product.description || "Product description goes here."}
                    </p>

                    <ul className="list-disc ml-6 text-gray-600">
                        {product.features?.length > 0
                            ? product.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))
                            : ["Premium material", "Handmade upholstery", "Quality timeless classic"].map((defaultFeature, index) => (
                                <li key={index}>{defaultFeature}</li>
                            ))}
                    </ul>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-1">Dimensions</h3>
                        <div className="grid grid-cols-3 gap-x-1">
                            <p className="font-medium text-gray-700 text-left">Height</p>
                            <p className="font-medium text-gray-700 text-left">Width</p>
                            <p className="font-medium text-gray-700 text-left">Depth</p>
                        </div>
                        <div className="grid grid-cols-3 gap-x-1">
                            <p className="text-gray-600 text-left">{height}</p>
                            <p className="text-gray-600 text-left">{width}</p>
                            <p className="text-gray-600 text-left">{depth}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleDecrease}
                                className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="w-12 text-center border border-gray-300 rounded-md"
                            />
                            <button
                                onClick={handleIncrease}
                                className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-800">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
