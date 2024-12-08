export default function Features() {
    const features = [
        {
            icon: 'local_shipping',
            title: 'Next day as standard',
            description: 'Order before 3pm and get your order the next day as standard.',
        },
        {
            icon: 'handyman',
            title: 'Made by true artisans',
            description: 'Handmade crafted goods made with real passion and craftsmanship.',
        },
        {
            icon: 'price_check',
            title: 'Unbeatable prices',
            description: 'For our materials and quality you won’t find better prices anywhere.',
        },
        {
            icon: 'recycling',
            title: 'Recycled packaging',
            description: 'We use 100% recycled packaging to ensure our footprint is manageable.',
        },
    ];

    return (
        <section className="bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">What makes our brand different</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center"
                        >
                            <span className="material-icons text-primary text-4xl mb-4">{feature.icon}</span>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-center">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
