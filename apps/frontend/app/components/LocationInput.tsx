'use client';

import { useState } from 'react';

interface LocationInputProps {
  onSubmit: (address: string) => void;
}

export default function LocationInput({ onSubmit }: LocationInputProps) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      setError('Please enter an address or zip code');
      return;
    }

    if (trimmedAddress.length < 3) {
      setError('Please enter at least 3 characters');
      return;
    }

    setError('');
    onSubmit(trimmedAddress);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="text-sm font-medium text-gray-700">
          Address or Zip Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g., 1000 Brussels, Rue Neuve 123, Paris 75001"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Analyze
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    </form>
  );
}
