import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Secure way to access cookies in Next.js App Router
import { client } from '@/sanity/lib/client';

export async function GET() {
    try {
        // Securely retrieve the userId from cookies
        const userId = cookies().get('userId')?.value;

        if (!userId) {
            return NextResponse.json({ error: 'User not logged in' }, { status: 401 });
        }

        // Fetch user profile from Sanity
        const profile = await client.fetch(
            `*[_type == "user" && _id == $userId][0]{ name, email }`,
            { userId }
        );

        if (!profile) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Fetch orders related to the user
        const orders = await client.fetch(
            `*[_type == "order" && customer._ref in *[_type == "customer" && email == $email]._id]{
        _id,
        trackingNumber,
        total,
        status,
        _createdAt
      } | order(_createdAt desc)`,
            { email: profile.email }
        );

        return NextResponse.json({ profile, orders });
    } catch (error) {
        console.error('Error fetching customer data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
