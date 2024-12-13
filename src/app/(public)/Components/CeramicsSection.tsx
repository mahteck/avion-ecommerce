import Link from "next/link";

export default function Hero() {
    return (
        <div>
            <section className="py-12">
                <h3 className="text-center text-xl font-bold mb-8">New Ceramics</h3>

                {/* Grid to display 4 boxes in one row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
                    {/* Box 1 */}
                    <div className="flex flex-col items-center text-center border p-4 rounded-md hover:bg-gray-100">
                        <img
                            src="/images/chair.png"
                            alt="The Dandy Chair"
                            width={250}
                            height={250}
                            className="w-full object-cover mb-4"
                        />
                        <h4 className="font-bold mb-2">The Dandy Chair</h4>
                        <p className="text-gray-500 mb-2">Stylish and comfortable</p>
                        <p className="font-semibold text-lg">£250</p>
                    </div>
                    {/* Box 2 */}
                    <div className="flex flex-col items-center text-center border p-4 rounded-md hover:bg-gray-100">
                        <img
                            src="/images/vase-set.png"
                            alt="The Silky Vase"
                            width={250}
                            height={250}
                            className="w-full object-cover mb-4"
                        />
                        <h4 className="font-bold mb-2">The Silky Vase</h4>
                        <p className="text-gray-500 mb-2">Elegant design</p>
                        <p className="font-semibold text-lg">£125</p>
                    </div>
                    {/* Box 3 */}
                    <div className="flex flex-col items-center text-center border p-4 rounded-md hover:bg-gray-100">
                        <img
                            src="/images/silk-vase.png"
                            alt="Rustic Vase Set"
                            width={250}
                            height={250}
                            className="w-full object-cover mb-4"
                        />
                        <h4 className="font-bold mb-2">Rustic Vase Set</h4>
                        <p className="text-gray-500 mb-2">Charming rustic design</p>
                        <p className="font-semibold text-lg">£155</p>
                    </div>
                    {/* Box 4 */}
                    <div className="flex flex-col items-center text-center border p-4 rounded-md hover:bg-gray-100">
                        <img
                            src="/images/lamp.png"
                            alt="The Lucy Lamp"
                            width={250}
                            height={250}
                            className="w-full object-cover mb-4"
                        />
                        <h4 className="font-bold mb-2">The Lucy Lamp</h4>
                        <p className="text-gray-500 mb-2">Modern and sleek</p>
                        <p className="font-semibold text-lg">£399</p>
                    </div>
                </div>

                {/* Centered "View Collection" button */}
                <div className="text-center mt-6">
                    <Link href="/ProductListing"><button className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-600">
                        View Collection
                    </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
