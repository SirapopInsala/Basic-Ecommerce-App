"use client"

import React, { useState } from 'react';
import { CartProvider } from '../components/CartContext';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';
import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <CartProvider>
      <html>
        <head />
        <body>
          <Navbar toggleSidebar={toggleSidebar} />
          <CartSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {children}
          <Footer />
        </body>
      </html>
    </CartProvider>
  );
};

export default RootLayout;
