export default function Hero() {
    return (
        <div>
            {/* Sign Up Section */}
            <section className="py-12 bg-gray-800 text-white text-center">
                <h3 className="text-2xl font-bold mb-6">Join the club and get the benefits</h3>
                <p className="mb-6">Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop-up stores, and more.</p>
                <div>
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="px-6 py-3 rounded-md border border-gray-300 text-gray-800"
                    />
                    <button className="bg-gray-700 text-white px-6 py-3 rounded-md ml-4 hover:bg-gray-600">
                        Sign Up
                    </button>
                </div>
            </section>
        </div>
    );
}
