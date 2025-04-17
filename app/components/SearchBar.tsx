'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearch } from '../context/SearchContext';
import { useRouter } from 'next/navigation';
import SearchSuggestions from './SearchSuggestions';

const searchSuggestions = [
  'T-shirts',
  'Jeans',
  'Dresses',
  'Sneakers',
  'Jackets',
  'Accessories'
];

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { setSearchQuery } = useSearch();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentWord = searchSuggestions[currentIndex];
    const updateText = () => {
      if (!isDeleting) {
        if (displayText !== currentWord) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
          timeout = setTimeout(updateText, 100);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText) {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
          timeout = setTimeout(updateText, 50);
        } else {
          setIsDeleting(false);
          setCurrentIndex((current) => (current + 1) % searchSuggestions.length);
        }
      }
    };

    if (!isFocused) {
      timeout = setTimeout(updateText, 100);
    }
    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, isFocused]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, setSearchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchQuery(searchTerm);
      router.push(`/?search=${encodeURIComponent(searchTerm)}`);
      setIsFocused(false);
    }
  };

  const handleSuggestionSelect = (term: string) => {
    setSearchTerm(term);
    setSearchQuery(term);
    router.push(`/?search=${encodeURIComponent(term)}`);
    setIsFocused(false);
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-md mx-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={`Search for ${!isFocused ? `${displayText}${showCursor ? '|' : ''}` : ''}`}
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 
                     dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100
                     focus:border-primary dark:focus:border-primary-light focus:outline-none 
                     focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-light/20
                     transition-all duration-300 text-gray-800 dark:text-gray-100 
                     placeholder-gray-500 dark:placeholder-gray-400
                     shadow-sm hover:shadow-md"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200" />
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-xs text-gray-400 dark:text-gray-500">
            Press Enter to search
          </div>
        </div>
      </form>

      {isFocused && (
        <SearchSuggestions
          searchTerm={searchTerm}
          onSelect={handleSuggestionSelect}
        />
      )}
    </div>
  );
} 