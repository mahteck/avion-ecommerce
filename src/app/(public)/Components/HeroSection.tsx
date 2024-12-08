import Link from "next/link";

export default function Hero() {
    return (
        <div>
            {/* Hero Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
                {/* Left */}
                <div className="bg-heroLeft text-white p-8 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-6">
                        The furniture brand for the future, with timeless designs
                    </h2>
                    <Link href="/ProductListing"><button className="bg-gray-700 px-6 py-3 rounded-md hover:bg-gray-600">
                        View Collection
                    </button></Link>
                    <p className="mt-6">
                        A new era in eco-friendly furniture with Avelon, the French luxury
                        retail brand with tasteful colors and modern web technologies.
                    </p>
                </div>
                {/* Right */}
                <div className="bg-heroRight flex items-center justify-center">
                    <img
                        src="/images/chair.png"
                        alt="Chair"
                        width={300}
                        height={300}
                    />
                </div>
            </section>
        </div>
    );
}
