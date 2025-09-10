import React, { useState } from 'react';
import API from '../api';

export default function SearchBook() {
  const [query, setQuery] = useState({ capacityRequired: '', fromPincode: '', toPincode: '', startTime: '' });
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = e => setQuery({ ...query, [e.target.name]: e.target.value });

  const handleSearch = async () => {
    try {
      const res = await API.get('/vehicles/available', { params: query });
      setResults(res.data.availableVehicles || []);
      setMessage('');
    } catch (err) {
      setMessage('Error: ' + err.response?.data?.error);
    }
  };

  const handleBook = async (vehicleId) => {
    try {
      const payload = { ...query, vehicleId, customerId: 'cust123' };
      const res = await API.post('/bookings', payload);
      console.log("search:", res.data);
      setMessage('Booking confirmed: ' + res.data._id);
    } catch (err) {
      setMessage('Error: ' + err.response?.data?.error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Search & Book Vehicle</h2>
      <div className="flex flex-col gap-4 mb-4">
        <input
          name="capacityRequired"
          placeholder="Capacity Required"
          value={query.capacityRequired}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="fromPincode"
          placeholder="From Pincode"
          value={query.fromPincode}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="toPincode"
          placeholder="To Pincode"
          value={query.toPincode}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="startTime"
          type="datetime-local"
          value={query.startTime}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <div className="flex flex-col gap-4">
          {results.map(r => (
            <div key={r._id} className="border p-4 rounded shadow flex justify-between items-center">
              <p>{r.name} - {r.capacityKg}kg - {r.tyres} tyres - {r.estimatedRideDurationHours}h</p>
              <button
                onClick={() => handleBook(r._id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}
