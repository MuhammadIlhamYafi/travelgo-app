import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Home() {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    API.get('/api/v1/banners').then((res) => setBanners(res.data.data));
    API.get('/api/v1/categories').then((res) => setCategories(res.data.data));
    API.get('/api/v1/activities').then((res) => setActivities(res.data.data));
  }, []);

  return (
    <div>
      {/* Hero / Banner */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Jelajahi Dunia dengan TravelGo.</h1>
        <p className="text-lg mb-6 max-w-xl mx-auto">Temukan pengalaman baru dengan aktivitas seru, promo menarik, dan kenyamanan terbaik.</p>
        <a href="#categories" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition">Lihat Destinasi</a>
      </section>

      {/* Kategori */}
      <section className="max-w-screen-xl mx-auto py-12 px-4" id="categories">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Kategori</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((item) => (
            <div key={item.id} className="bg-white p-4 shadow rounded text-center hover:shadow-md transition">
              <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="text-lg font-semibold">{item.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Aktivitas */}
      <section className="max-w-screen-xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Aktivitas Populer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.slice(0, 6).map((item) => (
            <div key={item.id} className="bg-white rounded overflow-hidden shadow hover:shadow-lg transition">
              <img src={item.imageUrls[0]} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.city}</p>
                <p className="text-blue-600 font-bold mb-3">Rp {item.price.toLocaleString()}</p>
                <a href={`/activity/${item.id}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Detail</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
