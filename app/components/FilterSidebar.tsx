'use client';

import React, { useState } from 'react';
import { XMarkIcon, FunnelIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSearch } from '../context/SearchContext';

const categories = [
  'All',
  'Men',
  'Women',
  'Accessories',
  'Shoes',
  'Sale'
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' }
];

export default function FilterSidebar() {
  const { filters, setCategory, setPriceRange, setSortBy, clearFilters } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('categories');

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      setCategory([]);
    } else {
      setCategory([category]);
    }
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    if (type === 'min') {
      setPriceRange(numValue, filters.priceRange.max);
    } else {
      setPriceRange(filters.priceRange.min, numValue);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      {/* Mobile filter dialog */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-colors z-50"
        >
          <FunnelIcon className="h-6 w-6" />
        </button>
      </div>

      <div className={`
        fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden z-40
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <div className={`
          fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl transition-transform duration-300 transform
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="h-full flex flex-col">
            <div className="px-4 py-6 bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 px-4 py-6 overflow-y-auto">
              {renderFilterContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop filter sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-md rounded-lg p-6 sticky top-20 h-fit">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-primary flex items-center transition-colors"
          >
            <XMarkIcon className="h-4 w-4 mr-1" />
            Clear all
          </button>
        </div>
        {renderFilterContent()}
      </div>
    </>
  );

  function renderFilterContent() {
    return (
      <>
        {/* Categories Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full mb-3"
          >
            <h3 className="text-sm font-medium text-gray-900">Categories</h3>
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-500 transition-transform ${
                expandedSection === 'categories' ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          {expandedSection === 'categories' && (
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center group cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={category === 'All' ? filters.category.length === 0 : filters.category.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-primary transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full mb-3"
          >
            <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-500 transition-transform ${
                expandedSection === 'price' ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          {expandedSection === 'price' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Min Price</label>
                <input
                  type="number"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Max Price</label>
                <input
                  type="number"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sort By Section */}
        <div>
          <button
            onClick={() => toggleSection('sort')}
            className="flex items-center justify-between w-full mb-3"
          >
            <h3 className="text-sm font-medium text-gray-900">Sort By</h3>
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-500 transition-transform ${
                expandedSection === 'sort' ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          {expandedSection === 'sort' && (
            <select
              value={filters.sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white transition-colors"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </>
    );
  }
} 