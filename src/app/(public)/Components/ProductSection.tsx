export default function ProductSection() {
    return (
        <section className="py-12 bg-gray-50">
            <h3 className="text-center text-xl font-bold mb-8">Our Popular Products</h3>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
                {/* First Large Box */}
                <div className="lg:col-span-2 border p-4 rounded-md hover:bg-gray-100">
                    <img
                        src="/images/sofa.png" // Replace with your image path
                        alt="The Poplar Suede Sofa"
                        className="w-full object-cover h-64 mb-4 rounded-md"
                    />
                    <h4 className="text-lg font-bold mb-2">The Poplar Suede Sofa</h4>
                    <p className="text-gray-600 text-sm mb-4">£880</p>
                </div>

                {/* Second Box */}
                <div className="border p-4 rounded-md hover:bg-gray-100">
                    <img
                        src="/images/chair.png" // Replace with your image path
                        alt="The Dandy Chair"
                        className="w-full object-cover h-64 mb-4 rounded-md"
                    />
                    <h4 className="text-lg font-bold mb-2">The Dandy Chair</h4>
                    <p className="text-gray-600 text-sm mb-4">£250</p>
                </div>

                {/* Third Box */}
                <div className="border p-4 rounded-md hover:bg-gray-100">
                    <img
                        src="/images/dark-chair.png" // Replace with your image path
                        alt="The Dandy Chair"
                        className="w-full object-cover h-64 mb-4 rounded-md"
                    />
                    <h4 className="text-lg font-bold mb-2">The Dandy Chair</h4>
                    <p className="text-gray-600 text-sm mb-4">£250</p>
                </div>
            </div>

            {/* Centered View Collection Button */}
            <div className="text-center mt-6">
                <button className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-600">
                    View Collection
                </button>
            </div>
        </section>
    );
}
