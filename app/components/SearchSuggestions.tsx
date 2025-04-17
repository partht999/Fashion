'use client';

import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface SearchSuggestionsProps {
  searchTerm: string;
  onSelect: (term: string) => void;
}

const popularSearches = [
  'T-shirts',
  'Summer dresses',
  'Sneakers',
  'Jeans',
  'Accessories'
];

const trendingItems = [
  'Floral dresses',
  'Running shoes',
  'Denim jackets',
  'Sunglasses',
  'Beach wear'
];

export default function SearchSuggestions({ searchTerm, onSelect }: SearchSuggestionsProps) {
  const router = useRouter();

  if (!searchTerm) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => onSelect(term)}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Trending Now</h3>
          <div className="space-y-2">
            {trendingItems.map((item) => (
              <button
                key={item}
                onClick={() => onSelect(item)}
                className="flex items-center w-full px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <MagnifyingGlassIcon className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Filter suggestions based on search term
  const filteredSuggestions = [...popularSearches, ...trendingItems].filter(
    (item) => item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredSuggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-50">
      {filteredSuggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
        >
          <MagnifyingGlassIcon className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
          {suggestion}
        </button>
      ))}
    </div>
  );
} 