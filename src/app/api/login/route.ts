import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { client } from '@/sanity/lib/client';

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        // Fetch the user from the database (including the role)
        const user = await client.fetch(
            `*[_type == "user" && email == $email][0]`,
            { email }
        );

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Successful login - include role in the response
        return NextResponse.json(
            { 
                message: 'Login successful', 
                // userId: user._id, 
                // role: user.role  // Send the role in the response
                user: { _id: user._id, role: user.role }  // Send user object with role
            }, 
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in login route:', error);
        return NextResponse.json({ message: 'An error occurred, please try again later' }, { status: 500 });
    }
}
