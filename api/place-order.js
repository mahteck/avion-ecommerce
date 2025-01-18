// /pages/api/place-order.js

export default async function handler(req, res) {
    console.log("API route accessed"); // Add a log to check if the API is being hit

    if (req.method === 'POST') {
        try {
            console.log('Received request body:', req.body);  // Log the request body

            const { cartItems, shippingAddress, paymentMethod, total } = req.body;

            if (!cartItems || !shippingAddress || !paymentMethod || !total) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Process the order (e.g., save to a database or send to a payment gateway)
            console.log('Processing order with the following details:', {
                cartItems,
                shippingAddress,
                paymentMethod,
                total
            });

            // Respond with success
            return res.status(200).json({ message: 'Order placed successfully!' });
        } catch (error) {
            console.error('Error processing order:', error);
            return res.status(500).json({ message: 'Error placing order' });
        }
    } else {
        // If method is not POST
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
