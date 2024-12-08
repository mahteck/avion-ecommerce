export default function Cart() {
    return (
        <div className="w-full px-4 py-8">
            {/* Shopping Cart */}
            <div className="p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-left mb-6 text-gray-800">Your shopping cart</h2>

                {/* Subtle Line after Header */}
                <div className="border-t border-gray-200 mb-6"></div>

                {/* Grid Header (Product, Quantity, Total) */}
                <div className="grid grid-cols-3 text-sm font-medium text-gray-700 mb-4">
                    <span>Product</span>
                    <span className="text-right">Quantity</span>
                    <span className="text-right">Total</span>
                </div>

                {/* Cart Items */}
                <div className="space-y-6">
                    {/* Product 1 */}
                    <div className="grid grid-cols-3 items-center gap-4">
                        <div className="flex items-center space-x-4">
                            <img
                                src="/images/silk-vase.png"
                                alt="Graystone vase"
                                className="w-24 h-24 object-cover rounded-md border border-gray-100"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800">Graystone vase</h3>
                                <p className="text-sm text-gray-600">A timeless ceramic vase with a tri-color grey glaze.</p>
                            </div>
                        </div>
                        <span className="text-right text-gray-800">1</span>
                        <span className="text-right text-gray-800">£85</span>
                    </div>

                    {/* Product 2 */}
                    <div className="grid grid-cols-3 items-center gap-4">
                        <div className="flex items-center space-x-4">
                            <img
                                src="/images/basic-white-vase.png"
                                alt="Basic white vase"
                                className="w-24 h-24 object-cover rounded-md border border-gray-100"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800">Basic white vase</h3>
                                <p className="text-sm text-gray-600">Beautiful and simple, this is one for the classics.</p>
                            </div>
                        </div>
                        <span className="text-right text-gray-800">1</span>
                        <span className="text-right text-gray-800">£125</span>
                    </div>
                </div>

                {/* Subtle Line before Subtotal */}
                <div className="border-t border-gray-200 my-6"></div>

                {/* Cart Summary */}
                {/* <div className="flex justify-between mt-6">
                    <span className="text-sm text-gray-700 font-semibold">Subtotal</span>
                    <p className="text-xl font-bold text-gray-900">£210</p>
                </div> */}

                {/* Taxes and Shipping Text */}
                {/* <div className="mt-2 text-sm text-gray-600 text-right">
                    Taxes and shipping are calculated at checkout.
                </div> */}

                {/* Go to Checkout Button */}
                {/* <div className="flex justify-end mt-4">
                    <button className="bg-gray-400 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                        Go to checkout
                    </button>
                </div> */}

                {/* Subtotal Section */}
                <div className="mt-10 text-center lg:text-right">
                    <h1 className="inline text-lg sm:text-xl font-medium mr-4 text-gray-600">
                        Subtotal
                    </h1>
                    <h1 className="inline text-xl sm:text-2xl font-semibold">£210</h1>
                    <p className="text-sm mt-4">
                        Taxes and shipping are calculated at checkout
                    </p>
                    <br />
                    <button className="bg-gray-400 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                        Go to checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
