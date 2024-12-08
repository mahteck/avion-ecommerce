// components/ProductListing.js

export default function ProductListing() {
    const products = [
        { id: 1, name: "The Dandy Chair", price: "£250", image: "/images/chair.png" },
        { id: 2, name: "Rustic Vase Set", price: "£155", image: "/images/vase-set.png" },
        { id: 3, name: "The Silky Vase", price: "£125", image: "/images/silk-vase.png" },
        { id: 4, name: "The Lucy Lamp", price: "£399", image: "/images/lamp.png" },
        { id: 5, name: "The Dandy Chair", price: "£250", image: "/images/product5.png" },
        { id: 6, name: "Rustic Vase Set", price: "£155", image: "/images/product6.png" },
        { id: 7, name: "The Silky Vase", price: "£125", image: "/images/product7.png" },
        { id: 8, name: "The Lucy Lamp", price: "£399", image: "/images/product8.png" },
        { id: 9, name: "The Dandy Chair", price: "£250", image: "/images/chair.png" },
        { id: 10, name: "Rustic Vase Set", price: "£155", image: "/images/vase-set.png" },
        { id: 11, name: "The Silky Vase", price: "£125", image: "/images/silk-vase.png" },
        { id: 12, name: "The Lucy Lamp", price: "£399", image: "/images/lamp.png" },
    ];

    return (
        <div className="bg-white py-10 px-6 md:px-12 lg:px-24">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="group">
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-auto object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
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
