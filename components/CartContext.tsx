"use client"

import React, { createContext, useReducer, useContext, ReactNode, useMemo } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  image?: string;
};

type CartState = {
  products: Product[];
};

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'INCREMENT_QUANTITY'; productId: number }
  | { type: 'DECREMENT_QUANTITY'; productId: number };

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProductIndex = state.products.findIndex(p => p.id === action.product.id);
      if (existingProductIndex >= 0) {
        const updatedProducts = state.products.map((p, index) =>
          index === existingProductIndex ? { ...p, quantity: (p.quantity ?? 0) + 1 } : p
        );
        return { ...state, products: updatedProducts };
      } else {
        return { ...state, products: [...state.products, { ...action.product, quantity: 1 }] };
      }
    case 'REMOVE_FROM_CART':
      return { ...state, products: state.products.filter(p => p.id !== action.productId) };
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.productId ? { ...p, quantity: (p.quantity ?? 0) + 1 } : p
        ),
      };
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.productId ? { ...p, quantity: Math.max((p.quantity ?? 0) - 1, 0) } : p
        ),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { products: [] });

  // Memoize the context value
  const memoizedValue = useMemo(() => {
    // Calculate total price
    const totalPrice = state.products.reduce((total, product) => {
      return total + (product.price * (product.quantity ?? 0));
    }, 0);

    return { state, dispatch, totalPrice };
  }, [state]);

  return <CartContext.Provider value={memoizedValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
