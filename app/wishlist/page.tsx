'use client';

import React from 'react';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">My Wishlist</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <HeartIcon className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">Your wishlist is empty</p>
            <p className="text-gray-500 dark:text-gray-400">Save items you love to your wishlist and review them anytime.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">My Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-primary dark:text-primary-light">${product.price.toFixed(2)}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-primary dark:bg-primary-light text-white px-4 py-2 rounded-md hover:bg-primary-dark dark:hover:bg-primary transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        removeFromWishlist(product.id);
                        toast.success(`${product.name} removed from wishlist`);
                      }}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-4 py-2 rounded-md border border-red-500 dark:border-red-400 hover:border-red-700 dark:hover:border-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 