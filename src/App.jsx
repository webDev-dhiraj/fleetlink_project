import React from 'react';
import AddVehicle from './components/AddVehicle';
import SearchBook from './components/SearchBook';

export default function App() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">FleetLink</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* AddVehicle Card */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <AddVehicle />
        </div>

        {/* SearchBook Card */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <SearchBook />
        </div>
      </div>
    </div>
  );
}
