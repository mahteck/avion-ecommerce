import { NextResponse } from "next/server";

// Define a type for shipment details
interface ShipmentDetails {
    weight: number;
    distance: number;
}

// Dummy function to calculate shipment charges
const getShipmentCharges = (shipmentDetails: ShipmentDetails) => {
    const { weight, distance } = shipmentDetails;

    const baseRate = 10; // Base rate in dollars
    const weightCharge = weight * 0.5; // $0.5 per kg
    const distanceCharge = distance * 0.1; // $0.1 per km

    const totalCharges = baseRate + weightCharge + distanceCharge;

    return {
        carrier: "Dummy Carrier",
        service: "Standard",
        charges: totalCharges.toFixed(2),
        deliveryTime: "5-7 days",
    };
};

// API Route Handler
export async function POST(req: Request) {
    try {
        const shipmentDetails: ShipmentDetails = await req.json();
        console.log("Received shipment details:", shipmentDetails);

        // Check for missing data
        if (!shipmentDetails.weight || !shipmentDetails.distance) {
            return NextResponse.json({ error: "Missing required fields (weight or distance)" }, { status: 400 });
        }

        const charges = getShipmentCharges(shipmentDetails);

        // Return calculated charges in response
        return NextResponse.json({ rates: charges }, { status: 200 });
    } catch (error) {
        console.error("Error in shipment calculation:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
