import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Dashboard Admin</h1>
      <p className="text-gray-700">Halo Admin! Anda dapat mengelola konten website seperti:</p>
      <ul className="list-disc list-inside mt-3 text-gray-600">
        <li>Promo dan banner</li>
        <li>Kategori aktivitas wisata</li>
        <li>Aktivitas dan destinasi</li>
        <li>Transaksi dan user</li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
