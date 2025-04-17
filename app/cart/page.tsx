'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Your cart is empty</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>
        <div className="grid grid-cols-1 gap-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="relative h-24 w-24 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-md"
                />
              </div>
              <div className="ml-6 flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary transition-colors"
                    >
                      -
                    </button>
                    <span className="text-gray-900 dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              Total: ${total.toFixed(2)}
            </div>
            <button className="mt-4 w-full bg-primary dark:bg-primary-light text-white px-6 py-3 rounded-md hover:bg-primary-dark dark:hover:bg-primary transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 