import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Parse the request body
        const body = await req.json();
        console.log("Received request body:", body);

        const { cartItems, shippingAddress, paymentMethod, total } = body;

        // Validate required fields
        if (!cartItems || !shippingAddress || !paymentMethod || !total) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Simulate order processing and generate tracking number
        const trackingNumber = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;

        // Process the order (e.g., save to database or send to payment gateway)
        console.log("Processing order:", {
            cartItems,
            shippingAddress,
            paymentMethod,
            total,
            trackingNumber,
        });

        // Respond with success
        return NextResponse.json(
            {
                message: "Order placed successfully!",
                trackingNumber
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing order:", error);
        return NextResponse.json(
            { message: "Error placing order" },
            { status: 500 }
        );
    }
}
