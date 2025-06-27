// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const navigate = useNavigate();

    useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }
  }, []);


  useEffect(() => {
    const fetchCart = async () => {
      try {
        console.log("TOKEN:", localStorage.getItem("token"));
        const response = await API.get("/api/v1/cart");
        console.log("✅ Cart response:", response.data);
        setCartItems(response.data.data);
      } catch (err) {
        console.error("❌ Error memuat keranjang:", err.response?.data || err.message);
        setError("Gagal memuat keranjang.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await API.post("/api/v1/checkout");
      console.log("Checkout response:", response.data);
      setCheckoutMessage("✅ Checkout berhasil! Terima kasih atas pesanan Anda.");
      setCartItems([]); // kosongkan keranjang
    } catch (err) {
      console.error("Gagal checkout:", err.response?.data || err.message);
      setCheckoutMessage("❌ Gagal melakukan checkout.");
    }
  };

  if (loading) return <p className="p-6">Memuat keranjang...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Keranjang Saya</h1>
      {checkoutMessage && (
        <p className={`mb-4 font-medium ${checkoutMessage.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {checkoutMessage}
        </p>
      )}
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Keranjang masih kosong.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow-sm">
              <h3 className="font-semibold">{item.product?.name || "(Produk tidak ditemukan)"}</h3>
              <p>Jumlah: {item.quantity}</p>
              <p>Harga: Rp {item.product?.price.toLocaleString()}</p>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Checkout Sekarang
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
