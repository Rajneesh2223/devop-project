'use client'; // This is required for forms and state in Next.js

import { useState } from 'react';

export default function Home() {
  // State to hold the form data
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // State to show a message to the user
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form reload
    setMessage('Submitting...');

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mobileNumber }), // Send the state data as JSON
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setMessage(`Success! User added with ID: ${data._id}`);
        // Clear the form
        setName('');
        setMobileNumber('');
      } else {
        // Handle server errors
        setMessage(`Error: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      // Handle network errors
      console.error('Fetch error:', error);
      setMessage('Error: Could not connect to the server.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Add a New User
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              id="mobile"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)} // Update mobile state
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>

        {/* Show the success or error message */}
        {message && (
          <p className={`mt-4 text-center text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}