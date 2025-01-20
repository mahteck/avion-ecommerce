import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/sanity/lib/client';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Request Method:', req.method);
    console.log('Request Body:', req.body);

    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const userData = { _type: 'user', name, email, password: hashedPassword };
            const user = await client.create(userData);

            return res.status(200).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            // return res.status(500).json({ error: error.message || 'Failed to create user' });
            const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
            return res.status(500).json({ error: errorMessage });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
