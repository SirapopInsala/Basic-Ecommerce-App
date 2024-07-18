// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { state } = useCart();
  const totalItems = state.products.reduce((sum, product) => sum + (product.quantity ?? 0), 0);

  return (
    <nav className="flex bg-gray-300 text-black justify-between p-7">
      <Link href="/" className='font-bold'>LeafyCart</Link>
      <button onClick={toggleSidebar}>Basket ({totalItems})</button>
    </nav>
  );
};

export default Navbar;
