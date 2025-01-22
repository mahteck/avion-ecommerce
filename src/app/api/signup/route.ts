import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const userData = { _type: 'user', name, email, password: hashedPassword, role:'customer' };

        const user = await client.create(userData);

        return NextResponse.json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
