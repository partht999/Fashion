'use client';

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSearch } from '../context/SearchContext';

export default function ActiveFilters() {
  const { filters, setCategory, setPriceRange, clearFilters } = useSearch();
  const hasActiveFilters = filters.category.length > 0 || 
    filters.priceRange.min > 0 || 
    filters.priceRange.max < 1000 ||
    filters.searchQuery;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white dark:bg-gray-900 transition-colors">
      {filters.searchQuery && (
        <FilterTag 
          label={`Search: ${filters.searchQuery}`} 
          onRemove={() => clearFilters()} 
        />
      )}

      {filters.category.map(category => (
        <FilterTag 
          key={category}
          label={`Category: ${category}`}
          onRemove={() => setCategory([])}
        />
      ))}

      {(filters.priceRange.min > 0 || filters.priceRange.max < 1000) && (
        <FilterTag 
          label={`Price: $${filters.priceRange.min} - $${filters.priceRange.max}`}
          onRemove={() => setPriceRange(0, 1000)}
        />
      )}

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary transition-colors ml-2 flex items-center"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
      {label}
      <button
        onClick={onRemove}
        className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </span>
  );
} 