"use client"

import React, { useState } from 'react';
import CheckoutForm from '../../components/CheckoutForm';
import OrderSummaryModal from '../../components/OrderSummaryModal';

const CheckoutPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(null);

  const handleCheckout = (info: any) => {
    setShippingInfo(info);
    setModalOpen(true);
  };

  return (
    <main className="p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <CheckoutForm onSubmit={handleCheckout} />
      {shippingInfo && (
        <OrderSummaryModal
          isOpen={isModalOpen}
          shippingInfo={shippingInfo}
          onClose={() => setModalOpen(false)}
        />
      )}
    </main>
  );
};

export default CheckoutPage;
