'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { SearchProvider } from './context/SearchContext';
import { ThemeProvider } from './context/ThemeContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SearchProvider>
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 2000,
                  style: {
                    background: '#4B5563',
                    color: '#fff',
                    padding: '16px',
                  },
                }}
              />
              {children}
            </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
      </SearchProvider>
    </ThemeProvider>
  );
} 