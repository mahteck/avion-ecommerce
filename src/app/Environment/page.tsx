'use client';

import { client } from '@/sanity/lib/client';
import { useEffect, useState } from 'react';

// Define the Environment interface
interface Environment {
  name: string;
  code: string;
  description: string;
}

const EnvironmentList = () => {
  // Define state with type
  const [environments, setEnvironments] = useState<Environment[]>([]);

  // Fetch data from Sanity
  useEffect(() => {
    client
      .fetch<Environment[]>(`*[_type == "environment"]`)
      .then((data) => setEnvironments(data))
      .catch((error) => console.error('Error fetching environments:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Professional Environment Types
        </h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {environments.map((env) => (
            <li
              key={env.code}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {env.name} <span className="text-gray-500">({env.code})</span>
              </h2>
              <p className="text-gray-600">{env.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EnvironmentList;
