'use client';

import React from 'react';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right',
      duration: 2000,
      style: {
        background: '#4B5563',
        color: '#fff',
        padding: '16px',
      },
    });
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  React.useEffect(() => {
    addToRecentlyViewed(product);
  }, [product, addToRecentlyViewed]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group transition-colors duration-200">
      <div className="relative h-64">
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          {isWishlisted ? (
            <HeartSolidIcon className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary dark:text-primary-light">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors flex items-center space-x-2"
          >
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
} 