import React from 'react';
import ProductItem from './ProductItem';


  export type Product = {
    id: number;
    name: string;
    price: number;
    image: string; 
  };


const products: Product[] = [
  { id: 1, name: 'Cerael', price: 100, image: 'product1.jpg' },
  { id: 2, name: 'Pretzel', price: 175, image: 'product2.jpg' },
  { id: 3, name: 'Nutella Biscuits', price: 300, image: 'product3.jpg' },
  { id: 4, name: 'Heinz Beanz', price: 75, image: 'product4.jpg' },
  // Add more products as needed
];

const ProductList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
