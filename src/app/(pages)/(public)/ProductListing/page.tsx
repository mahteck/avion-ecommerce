import { client } from "@/sanity/lib/client";
import Link from "next/link";

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

interface Props {
    searchParams: {
        category?: string;
        search?: string;
    };
}

export default async function ProductListing({ searchParams }: Props) {
    const { category, search } = searchParams;

    let query = "";
    let queryParams: { [key: string]: string | null } = {};

    if (search) {
        query = `*[_type == "product" && (name match $search || category->name match $search)]{
            id,
            name,
            price,
            "imageUrl": image.asset->url,
            "slug": slug,
            category->{
                name
            }
        }`;
        queryParams = { search: `${search}*` };
    } else if (category) {
        query = `*[_type == "product" && category->name == $category]{
            id,
            name,
            price,
            "imageUrl": image.asset->url,
            "slug": slug,
            category->{
                name
            }
        }`;
        queryParams = { category };
    } else {
        query = `*[_type == "product"]{
            id,
            name,
            price,
            "imageUrl": image.asset->url,
            "slug": slug,
            category->{
                name
            }
        }`;
    }

    let products: Product[] = [];
    let errorMessage = "";

    try {
        products = await client.fetch(query, queryParams);
        console.log("Fetched products:", products); // Log fetched products
    } catch (error: any) {
        if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
            errorMessage = "Network issue detected. Please check your internet connection.";
        } else {
            errorMessage = `Error fetching products: ${error.message || error}`;
        }
        console.error("Error fetching products:", error);
    }

    return (
        <div className="bg-white py-10 px-6 md:px-12 lg:px-24">
            {/* Responsive Banner Section */}
            <div
                className="relative w-full h-60 sm:h-80 lg:h-96 bg-cover bg-center mb-10 rounded-lg shadow-lg overflow-hidden"
                style={{ backgroundImage: "url('/images/product-banner.png')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white text-center">
                        {search
                            ? `Search Results for "${search}"`
                            : category
                                ? `Products in "${category}"`
                                : "All Products"}
                    </h1>
                </div>
            </div>

            {/* Product Section */}
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
                {search
                    ? `Search Results for "${search}"`
                    : category
                        ? `Products in "${category}"`
                        : "All Products"}
            </h1>

            {errorMessage ? (
                <div className="text-center text-red-500">
                    <p>{errorMessage}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.length > 0 ? (
                        products.map((product: Product) => (
                            <div
                                key={product.id}
                                className="group flex flex-col items-center bg-gray-50 rounded-lg shadow-md overflow-hidden"
                            >
                                <Link href={`/ProductDetail/${product.id}`}>
                                    <div className="relative w-full h-64">
                                        <img
                                            src={product.imageUrl || "/images/default.png"}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                </Link>
                                <div className="flex flex-col items-center p-4 w-full">
                                    <h2 className="text-lg font-medium text-gray-700 text-center">
                                        {product.name}
                                    </h2>
                                    <p className="text-sm font-semibold text-gray-500 text-center mt-2">
                                        PKR{product.price ? `${product.price}` : "Price Not Available"}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-4">
                            No products found matching your search.
                        </p>
                    )}
                </div>
            )}

            <div className="flex justify-center mt-10">
                <Link href={{ pathname: '/ProductListing', query: {} }}>
                    <button className="px-6 py-3 bg-gray-300 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                        View All Products
                    </button>
                </Link>
            </div>
        </div>
    );
}
