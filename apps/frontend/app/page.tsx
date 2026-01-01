'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import LocationInput from './components/LocationInput';

// Import Map dynamically to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function Home() {
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([50.8503, 4.3517]); // Default: Brussels
  const [isLoading, setIsLoading] = useState(false);

  const handleAddressSubmit = async (address: string) => {
    setSelectedAddress(address);
    setIsLoading(true);

    // TODO: Call your backend geocoding API
    // For now, just use default Brussels center
    // In production: await fetch(`/api/geocode?address=${encodeURIComponent(address)}`)

    // Placeholder - you'll replace this with actual geocoding
    console.log('Geocoding address:', address);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Locus</h1>
          <p className="text-sm text-gray-600">
            Find the best location for your business
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="bg-white border-r border-gray-200 p-6 lg:w-96">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Analyze Location
              </h2>
              <LocationInput onSubmit={handleAddressSubmit} />
            </div>

            {selectedAddress && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  {isLoading ? 'Loading...' : `Analyzing: ${selectedAddress}`}
                </h3>
                <p className="text-sm text-blue-700">
                  {isLoading
                    ? 'Geocoding address...'
                    : 'Ready to fetch nearby POIs and analyze location!'}
                </p>
              </div>
            )}

            <div className="text-sm text-gray-500">
              <p className="font-medium mb-2">Next steps:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Connect to backend API</li>
                <li>Add geocoding service</li>
                <li>Fetch nearby POIs from OpenStreetMap</li>
                <li>Calculate location scores</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Map Area */}
        <main className="flex-1 relative">
          <Map
            center={mapCenter}
            zoom={14}
            markers={
              selectedAddress
                ? [{ position: mapCenter, popup: selectedAddress }]
                : []
            }
          />
        </main>
      </div>
    </div>
  );
}
