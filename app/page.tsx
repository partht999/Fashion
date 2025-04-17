'use client';

import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { products } from './data/products';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';

export default function Home() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const showSale = searchParams.get('sale') === 'true';

  const filteredProducts = products.filter(product => {
    if (category) {
      return product.category === category;
    }
    if (showSale) {
      // For demo purposes, let's consider items under $50 as sale items
      return product.price < 50;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      
      {/* Hero Section */}
      {!category && !showSale && (
        <div className="relative h-[70vh] bg-gray-900">
          <Image
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            alt="Hero Image"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-60"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Spring Collection 2024</h1>
              <p className="text-xl mb-8">Discover the latest trends in fashion</p>
              <button className="bg-white text-primary dark:bg-gray-800 dark:text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}'s Collection` : 
           showSale ? 'Sale Items' : 'Featured Products'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
} 