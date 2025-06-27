// 6. src/pages/Home.jsx (ditambahkan background gambar pada hero section)
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

function Home() {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    API.get('/api/v1/banners').then((res) => setBanners(res.data.data));
    API.get('/api/v1/categories').then((res) => setCategories(res.data.data));
    API.get('/api/v1/activities').then((res) => setActivities(res.data.data));
  }, []);

  const filteredActivities = activities.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(keyword) ||
      item.city.toLowerCase().includes(keyword)
    );
  });

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const resetSearch = () => setSearch('');

  return (
    <div className="bg-gray-50">
      {/* Hero / Banner */}
      <section
        className="relative text-white py-24 px-6 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Jelajahi Dunia dengan TravelGo</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">Temukan pengalaman seru dan aktivitas wisata terbaik dengan mudah, cepat, dan nyaman.</p>
          <a href="#categories" className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">Lihat Kategori</a>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto px-4 pt-12 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Cari aktivitas, kategori, atau lokasi..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={resetSearch}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Reset
          </button>
        )}
      </section>

      {/* Kategori */}
      <section className="max-w-7xl mx-auto px-4 pt-16" id="categories">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Kategori Aktivitas</h2>
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredCategories.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition p-4 text-center">
                <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded mb-3" />
                <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Kategori tidak ditemukan.</p>
        )}
      </section>

      {/* Aktivitas */}
      <section className="max-w-7xl mx-auto pb-16 px-4 pt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Aktivitas Populer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition flex flex-col">
                <img src={item.imageUrls[0]} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">{item.city}</p>
                  <p className="text-blue-600 font-semibold mb-4">Rp {item.price.toLocaleString()}</p>
                  <Link to={`/activity/${item.id}`} className="mt-auto inline-block bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition">Lihat Detail</Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">Aktivitas tidak ditemukan.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
