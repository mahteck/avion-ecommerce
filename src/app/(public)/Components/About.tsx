export default function AboutSection() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side: Text Content */}
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-600">
                            From a studio in London to a global brand with over 400 outlets
                        </h2>
                        <p className="text-gray-600 mb-6">
                            When we started Avion, the idea was simple. Make high-quality furniture affordable and available for the mass market.
                        </p>
                        <p className="text-gray-600 mb-6">Handcrafted and lovingly crafted furniture and homeware is what we live,
                            breathe and design so our Chelsea boutique can become the hotspot for the London interior design community.
                        </p>
                        <button className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-600">
                            Get in touch
                        </button>
                    </div>

                    {/* Right Side: Image */}
                    <div className="flex justify-center">
                        <img
                            src="/images/about-image.png" // Replace with your image path
                            alt="About Avion"
                            className="rounded-md w-full max-w-xl lg:max-w-2xl object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
