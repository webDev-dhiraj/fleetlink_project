
import React, { useState } from 'react';
import API from '../api';

export default function AddVehicle() {
  const [form, setForm] = useState({ name: '', capacityKg: '', tyres: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/vehicles', form);
      console.log("res :", res.data);
      setMessage('Vehicle added: ' + res.data.name);
    } catch (err) {
      setMessage('Error: ' + err.response?.data?.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-16 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Vehicle</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="capacityKg"
          type="number"
          placeholder="Capacity"
          value={form.capacityKg}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="tyres"
          type="number"
          placeholder="Tyres"
          value={form.tyres}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}
