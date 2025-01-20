import { client } from '@/sanity/lib/client'; // Import your Sanity client
import bcrypt from 'bcryptjs'; // For password hashing

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            // Hash the password before saving
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Create the user object to save in Sanity
            const userData = {
                _type: 'user',
                name,
                email,
                password: hashedPassword, // Save the hashed password
            };

            // Create the user document in Sanity
            const user = await client.create(userData);

            return res.status(200).json({ message: 'User created successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
