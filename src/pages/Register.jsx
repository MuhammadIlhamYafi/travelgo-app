import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.phoneNumber || !form.password) {
    alert("Semua field wajib diisi.");
    return;
  }

  const payload = { ...form, role: 'HL-BFN0Pzi5McnlAeG5OZOlMFHL9ZpB33EiOicUc_Mtz9NEM562GqtaJPe_', passwordRepeat: form.password, profilePictureUrl: "https://i.pravatar.cc/300?u=" + form.email};
  console.log('Data dikirim ke API:', JSON.stringify(payload, null, 2));

  try {
    await API.post('/api/v1/register', payload);
    alert('Registrasi berhasil! Silakan login.');
    navigate('/login');
  } catch (error) {
    alert('Registrasi gagal: ' + (error.response?.data?.message || error.message));
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white shadow-md p-8 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Register</h2>
        <input name="name" type="text" placeholder="Nama Lengkap" onChange={handleChange} required className="mb-4 px-4 py-2 border rounded w-full" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="mb-4 px-4 py-2 border rounded w-full" />
        <input name="phoneNumber" type="text" placeholder="Nomor HP" onChange={handleChange} required className="mb-4 px-4 py-2 border rounded w-full" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="mb-6 px-4 py-2 border rounded w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700">Daftar</button>
      </form>
    </div>
  );
}

export default Register;