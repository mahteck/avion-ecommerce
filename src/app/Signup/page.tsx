'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Ensure it's only used on the client-side

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // This ensures that the code using `useRouter` is only run on the client-side
        if (typeof window !== 'undefined') {
            // You can now safely use `router`
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                throw new Error('Failed to sign up');
            }

            setLoading(false);
            router.push('/login'); // Redirect to the login page on successful signup
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Sign Up</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`w-full py-2 bg-blue-600 text-white font-semibold rounded-md transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>
                </form>

                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:text-blue-700">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
