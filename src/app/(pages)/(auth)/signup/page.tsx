"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import handleSubmitForm from "@/actions/signupAction";

export default function Signup() {
  const [formState, setFormState] = useState<string | null>(null);
  const router = useRouter(); // Next.js router for navigation

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form reload
    const formData = new FormData(event.currentTarget);
    
    const response = await handleSubmitForm(null, formData); // API Call
    setFormState(response); // Store response in state
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-6 space-y-4 w-full">
        <h2 className="text-xl font-bold text-center">Sign Up</h2>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex flex-col space-y-3">
          <input
            type="submit"
            value="Sign Up"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
          />

          {/* Sign In Button */}
          <button
            type="button"
            onClick={() => router.push("/signin")}
            className="w-full bg-gray-500 text-white font-medium py-2 rounded-lg hover:bg-gray-600 cursor-pointer"
          >
            Already have an account? Sign In
          </button>
        </div>

        {formState && (
          <p className="text-sm text-red-500 mt-4 bg-red-100 p-2 border border-red-400 rounded">
            {formState}
          </p>
        )}
      </form>
    </div>
  );
}
