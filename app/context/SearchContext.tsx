'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface FilterState {
  category: string[];
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: string;
  searchQuery: string;
}

interface SearchContextType {
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setCategory: (categories: string[]) => void;
  setPriceRange: (min: number, max: number) => void;
  setSortBy: (sort: string) => void;
  clearFilters: () => void;
}

const defaultFilters: FilterState = {
  category: [],
  priceRange: {
    min: 0,
    max: 1000,
  },
  sortBy: 'newest',
  searchQuery: '',
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const setSearchQuery = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const setCategory = useCallback((categories: string[]) => {
    setFilters(prev => ({ ...prev, category: categories }));
  }, []);

  const setPriceRange = useCallback((min: number, max: number) => {
    setFilters(prev => ({ ...prev, priceRange: { min, max } }));
  }, []);

  const setSortBy = useCallback((sort: string) => {
    setFilters(prev => ({ ...prev, sortBy: sort }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <SearchContext.Provider 
      value={{ 
        filters,
        setSearchQuery,
        setCategory,
        setPriceRange,
        setSortBy,
        clearFilters
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 