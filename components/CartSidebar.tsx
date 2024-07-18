import React from 'react';
import { useCart } from './CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CartSidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  const { state, dispatch, totalPrice } = useCart();
  const router = useRouter();

  const incrementQuantity = (productId: number) => {
    dispatch({ type: 'INCREMENT_QUANTITY', productId });
  };

  const decrementQuantity = (productId: number) => {
    dispatch({ type: 'DECREMENT_QUANTITY', productId });
  };

  const removeProduct = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const handleCheckout = () => {
    router.push('/checkout'); // Navigate to checkout page
  };

  return (
    <div className={`text-black fixed right-0 top-0 h-full w-1/3 bg-white z-10 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
      <div className="p-4">
        <button onClick={toggleSidebar} className="font-bold mt-4 bg-white text-gray-700 py-2 px-4 rounded block">
          x
        </button>
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        {state.products.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {state.products.map(product => (
              <div key={product.id} className="flex items-center justify-between border-b pb-2 mb-2">
                
                <div>
                  {product.image && (
                    <img src={product.image} alt={product.name} className="h-10 w-10 object-cover" />
                  )}
                  <p className="text-lg">{product.name}</p>
                  <p className="text-gray-600">{product.price * (product.quantity ?? 1)} Bath</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => decrementQuantity(product.id)} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l">
                    -
                  </button>
                  <span className="px-4">{product.quantity}</span>
                  <button onClick={() => incrementQuantity(product.id)} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r">
                    +
                  </button>
                  <button onClick={() => removeProduct(product.id)} className="ml-4 text-red-600">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-lg font-semibold">Total: {totalPrice} Bath</p>
              <button onClick={handleCheckout} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded block">
                Checkout
              </button>
            </div>
          </>
        )}
        
      </div>
    </div>
  );
};

export default CartSidebar;
