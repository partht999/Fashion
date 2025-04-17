'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBagIcon, UserIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { cartCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary dark:text-primary-light hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            FASHION STORE
          </Link>
          
          <SearchBar />

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">Home</Link>
            <Link href="/?category=men" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">Men</Link>
            <Link href="/?category=women" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">Women</Link>
            <Link href="/?sale=true" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">Sale</Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link 
              href="/profile" 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Profile"
            >
              <UserIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </Link>
            <Link 
              href="/wishlist" 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative"
              title="Wishlist"
            >
              <HeartIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link 
              href="/cart" 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative"
              title="Cart"
            >
              <ShoppingBagIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary dark:bg-primary-light text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 