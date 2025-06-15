import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Checkout() {
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');

  const fetchPaymentMethods = async () => {
    try {
      const res = await API.get('/api/v1/payment-methods');
      setMethods(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    try {
      await API.post('/api/v1/checkout', { paymentMethodId: selectedMethod });
      alert('Checkout successful!');
    } catch (err) {
      alert('Checkout failed.');
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>
      <select onChange={(e) => setSelectedMethod(e.target.value)} className="w-full border p-2 mb-4 rounded">
        <option value="">Select payment method</option>
        {methods.map(method => (
          <option key={method.id} value={method.id}>{method.name}</option>
        ))}
      </select>
      <button onClick={handleCheckout} disabled={!selectedMethod} className="w-full bg-green-600 text-white py-2 rounded">Confirm Checkout</button>
    </div>
  );
}

export default Checkout;