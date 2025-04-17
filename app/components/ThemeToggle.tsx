'use client';

import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-6 h-6">
        <div className={`absolute inset-0 transform transition-transform duration-500 ${theme === 'light' ? 'rotate-0' : 'rotate-180 opacity-0'}`}>
          <SunIcon className="h-6 w-6 text-yellow-500" />
        </div>
        <div className={`absolute inset-0 transform transition-transform duration-500 ${theme === 'dark' ? 'rotate-0' : '-rotate-180 opacity-0'}`}>
          <MoonIcon className="h-6 w-6 text-blue-500" />
        </div>
      </div>
      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </span>
    </button>
  );
} 