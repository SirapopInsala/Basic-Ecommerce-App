// components/OrderSummaryModal.tsx
import React from 'react';
import { useCart } from './CartContext';

const OrderSummaryModal = ({ isOpen, shippingInfo, onClose }: { isOpen: boolean; shippingInfo: any; onClose: () => void }) => {
  const { state } = useCart();

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'} text-black`}>
      <div className="bg-white p-20 rounded">
        <h2 className="text-left font-bold mb-18">Shipping Address</h2>
        <p>{shippingInfo.name}</p>
        <p>{shippingInfo.address}</p>
        <p>{shippingInfo.phone}</p>
        <ul className="mt-5">
          
          {state.products.map(product => (
            <li key={product.id} className="flex justify-between">
              {product.image && (
                <img src={product.image} alt={product.name} className="h-10 w-10 object-cover" />
              )}
              {product.name} {(product.price * (product.quantity ?? 1))} Baht
            </li>
          ))}
        </ul>
        <p className="mt-4"><strong>Total:</strong> {state.products.reduce((sum, product) => sum + product.price * (product.quantity ?? 0), 0)} Bath</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Close</button>
      </div>
    </div>
  );
};

export default OrderSummaryModal;
