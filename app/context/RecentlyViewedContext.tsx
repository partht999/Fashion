'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '../types/Product';

interface RecentlyViewedContextType {
  items: Product[];
  addToRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_RECENTLY_VIEWED = 8;

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const addToRecentlyViewed = useCallback((product: Product) => {
    setItems(currentItems => {
      const filteredItems = currentItems.filter(item => item.id !== product.id);
      return [product, ...filteredItems].slice(0, MAX_RECENTLY_VIEWED);
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ items, addToRecentlyViewed, clearRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
} 