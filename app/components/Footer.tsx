'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              Fashion Store is your one-stop destination for trendy and affordable fashion.
              We bring you the latest styles from around the world.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/?category=men" className="text-gray-400 hover:text-white transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link href="/?category=women" className="text-gray-400 hover:text-white transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link href="/?sale=true" className="text-gray-400 hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
              />
              <button className="bg-primary hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary text-white px-4 py-2 rounded-md transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Fashion Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 