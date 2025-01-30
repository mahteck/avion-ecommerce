"use client"; // Ensure this is a client-side component

import { useState } from "react";
import { useRouter } from "next/navigation";
import handleSubmitForm from "@/actions/signinAction";
// import { handleSubmitForm } from "@/actions/signinAction"; // Importing the function

export default function SignIn() {
  const [formState, setFormState] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const response = await handleSubmitForm(null, formData);
      console.log(response);

      // localStorage.setItem('userId', response._id); // Store userId in localStorage
      // console.log(`response userid: ${response._id}`);

      // if (response && response._id) {
      //   localStorage.setItem('userId', response._id);
      //   console.log(`response userid: ${response._id}`);
      // } else {
      //   setFormState("User not found or invalid response.");
      // }

      if (response?.message === "Invalid token") {
        setFormState("Your session has expired. Please log in again.");
      } else if (response?.redirectUrl) {
        router.push(response.redirectUrl);
      } else {
        setFormState(response.message);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setFormState("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-6 space-y-4 w-full">
        <h2 className="text-xl font-bold text-center">Sign In</h2>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="text"
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
            value="Login"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
          />

          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="w-full bg-gray-500 text-white font-medium py-2 rounded-lg hover:bg-gray-600 cursor-pointer"
          >
            Sign Up
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
