import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface Category {
    name: string;
    slug: string;
}

interface Product {
    id: number;
    name: string;
    price: number | null;
    imageUrl: string;
    slug: string;
    category: Category | null;
}

export default async function ProductListing() {

    const data: Product[] = await client.fetch(
        `*[_type == "product"]{
            id,
            name,
            price,
            "imageUrl": image.asset->url,
            "slug": slug,
            features,
            description,
            dimensions,
            category->{
                name
            }
        }`
    );

    const products: Product[] = data;
    console.log(`Product Data: ${data}`);

    return (
        <div className="bg-white py-10 px-6 md:px-12 lg:px-24">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product: Product, index: number) => (
                    <div key={product.id} className="group">
                        <Link href={`/ProductDetail/${product.slug}`}>
                            <div className="relative">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-auto object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </Link>
                        <div className="mt-4 text-center">
                            <h2 className="text-lg font-medium text-gray-700">{product.name}</h2>
                            <p className="text-sm font-semibold text-gray-500">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-10">
                <button className="px-6 py-3 bg-gray-300 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                    View Collection
                </button>
            </div>
        </div>
    );
}

