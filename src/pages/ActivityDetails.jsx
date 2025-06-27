import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

function ActivityDetail() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    API.get(`/api/v1/activity/${id}`).then(res => {
      setActivity(res.data.data);
    });
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await API.post('/api/v1/add-cart', {
        activityId: id,
        quantity: 1
      });
      alert('Berhasil ditambahkan ke keranjang!');
    } catch (err) {
      alert('Gagal menambahkan ke keranjang: ' + (err.response?.data?.message || err.message));
    }
  };

  if (!activity) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <img src={activity.imageUrls[0]} alt={activity.title} className="w-full h-80 object-cover rounded mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{activity.title}</h1>
      <p className="text-gray-600 mb-2">Lokasi: {activity.city}</p>
      <p className="text-gray-600 mb-2">Kategori: {activity.category.name}</p>
      <p className="text-gray-600 mb-4">Deskripsi: {activity.description}</p>
      <p className="text-xl font-bold text-blue-600 mb-4">Rp {activity.price.toLocaleString()}</p>

      {/* Tombol tambah ke keranjang */}
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
}

export default ActivityDetail;
