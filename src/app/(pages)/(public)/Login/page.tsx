'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset error message before submitting

        // Ensure the email is valid
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            setLoading(false);
            setError('Please enter a valid email address');
            return;
        }

        try {
            const res = await fetch('/api/login-api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Send only email and password
            });

            if (!res.ok) {
                const data = await res.json();
                const user = data.user;

                throw new Error(data.message || 'Failed to log in');
            }

            const data = await res.json();
            const user = data.user; // User object with role information
            localStorage.setItem('userId', user._id); // Store userId in localStorage
            //console.log(`user id : ${user}`);

            if (!user || !user.role) {
                setError('User role not found');
                setLoading(false);
                return;
            }

            setLoading(false);

            // Redirect to the appropriate dashboard based on the role
            if (user.role === 'admin') {
                router.push('/admin-dashboard'); // Redirect to Admin Dashboard
            } else if (user.role === 'customer') {
                router.push('/customer-dashboard'); // Redirect to Customer Dashboard
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        {/* Email validation error message */}
                        {!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) && email && (
                            <p className="text-red-500 text-sm">Please enter a valid email address</p>
                        )}
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
                            {loading ? 'Logging In...' : 'Login'}
                        </button>
                    </div>
                </form>

                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <a href="/Signup" className="text-blue-600 hover:text-blue-700">Sign up here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
