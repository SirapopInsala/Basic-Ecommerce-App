"use client"

import React from 'react';
import { useCart } from './CartContext';

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

type ProductProps = {
  product: Product;
};

const ProductItem: React.FC<ProductProps> = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  return (
    <div className="text-black bg-gray-200 border p-4 rounded">
      {/* Example of using image from public folder */}
      {product.image && (
        <img src={product.image} alt={product.name} className="h-30 w-30 object-cover" />
      )}
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">{product.price} Bath</p>
      <button onClick={addToCart} className="mt-2 bg-blue-500 text-white py-1 px-4 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
