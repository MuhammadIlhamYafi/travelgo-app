import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await API.get('/api/v1/cart');
      setCartItems(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await API.delete(`/api/v1/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="border p-4 mb-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{item?.activity?.title}</p>
              <p className="text-sm text-gray-500">Qty: {item.qty}</p>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline">Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;