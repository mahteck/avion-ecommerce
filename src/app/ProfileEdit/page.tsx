'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';

export default function EditProfile() {
    const router = useRouter();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProfileData() {
            try {
                // Get user ID from localStorage
                if (typeof window !== 'undefined') {
                    const userId = localStorage.getItem('userId');
                    if (!userId) {
                        router.push('/Login'); // Redirect to login if no user ID is found
                        return;
                    }

                    const user = await client.fetch(`*[_type == "user" && _id == $userId][0]{ name, email }`, { userId });
                    if (user) {
                        setProfileData({
                            name: user.name,
                            email: user.email,
                        });
                    }
                }
            } catch (err) {
                console.error('Failed to fetch profile data:', err);
                setError('Failed to load profile data.');
            }
        }

        fetchProfileData();
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (typeof window !== 'undefined') {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    setError('User not logged in');
                    setLoading(false);
                    return;
                }

                // Update user profile data, email will remain unchanged
                const updatedUser = await client
                    .patch(userId) // Update the user by their ID
                    .set({
                        name: profileData.name,
                    })
                    .commit();

                setLoading(false);
                router.push('/customer-dashboard'); // Redirect to dashboard after successful update
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile. Please try again.');
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        router.push('/Login'); // Redirect to login page after logout
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-xl space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Edit Profile</h1>

                {error && <div className="text-red-500 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={profileData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled
                        />
                        <p className="text-gray-500 text-sm mt-1">Email cannot be changed.</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className={`w-1/2 py-2 bg-blue-600 text-white font-semibold rounded-md transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                            disabled={loading}
                        >
                            {loading ? 'Updating Profile...' : 'Save Changes'}
                        </button>
                        
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-1/2 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <button
                        onClick={() => router.push('/customer-dashboard')}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
