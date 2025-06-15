import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'user', // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/v1/register', userData);
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      alert('Registrasi gagal: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form onSubmit={handleRegister} className="bg-white p-8 shadow rounded max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h2>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Nama</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">No. HP</label>
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Daftar</button>
      </form>
    </div>
  );
}

export default Register;
