// components/CheckoutForm.tsx
import React, { useState } from 'react';
import { useCart } from './CartContext';

const CheckoutForm = ({ onSubmit }: { onSubmit: (shippingInfo: any) => void }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const { state, totalPrice } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, address, phone, products: state.products, totalPrice });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white text-black">
      <div className="flex justify-between">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="w-2/3 p-4 border rounded">
          <h2 className="text-xl mb-4">Shipping Address</h2>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="w-full p-2 mb-4 border rounded"
          />
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
            className="w-full p-2 mb-4 border rounded"
          />
          Tel
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Place Order
          </button>
        </form>

        {/* Order Summary Section */}
        <div className="w-1/3 p-4 border rounded">
          <h2 className="text-xl mb-4">Order Summary</h2>
          <ul>
            {state.products.map(product => (
              <li key={product.id} className="flex justify-between mb-2">
                {product.image && (
                  <img src={product.image} alt={product.name} className="h-10 w-10 object-cover" />
                )}
                <span>{product.name}</span>
                <span>{(product.price * (product.quantity ?? 1))} Bath</span>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>{totalPrice} Bath</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
