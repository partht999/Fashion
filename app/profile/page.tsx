'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

// Mock data for demonstration
const initialUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  joinDate: 'January 2024',
  avatar: null,
  phone: '+1 (555) 123-4567',
  address: '123 Main St, City, State 12345'
};

const orders = [
  {
    id: '#ORD-001',
    date: '2024-02-15',
    status: 'Delivered',
    total: 159.97,
    items: [
      { name: 'Classic White T-Shirt', quantity: 1, price: 29.99 },
      { name: 'Slim Fit Jeans', quantity: 1, price: 59.99 },
      { name: 'Casual Blazer', quantity: 1, price: 69.99 }
    ]
  },
  {
    id: '#ORD-002',
    date: '2024-02-01',
    status: 'Processing',
    total: 79.99,
    items: [
      { name: 'Floral Summer Dress', quantity: 1, price: 79.99 }
    ]
  }
];

type Section = 'personal' | 'password' | 'shipping' | 'payment' | 'email' | null;

export default function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const renderPersonalInformation = () => {
    if (!isEditing) {
      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</h3>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">{user.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</h3>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">{user.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</h3>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">{user.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h3>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">{user.address}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-primary-light dark:focus:ring-offset-gray-900"
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit Information
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary dark:focus:border-primary-light focus:ring-primary dark:focus:ring-primary-light sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary dark:focus:border-primary-light focus:ring-primary dark:focus:ring-primary-light sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary dark:focus:border-primary-light focus:ring-primary dark:focus:ring-primary-light sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary dark:focus:border-primary-light focus:ring-primary dark:focus:ring-primary-light sm:text-sm"
            required
          />
        </div>
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary dark:bg-primary-light hover:bg-primary-dark dark:hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-primary-light dark:focus:ring-offset-gray-900"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-primary-light dark:focus:ring-offset-gray-900"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <UserCircleIcon className="h-24 w-24 text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Member since {user.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Account Settings */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Account Settings</h2>
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveSection('personal')}
                  className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    activeSection === 'personal' ? 'text-primary dark:text-primary-light bg-gray-50 dark:bg-gray-700' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Personal Information
                </button>
                <button 
                  onClick={() => setActiveSection('password')}
                  className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    activeSection === 'password' ? 'text-primary dark:text-primary-light bg-gray-50 dark:bg-gray-700' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Password & Security
                </button>
                <button 
                  onClick={() => setActiveSection('shipping')}
                  className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    activeSection === 'shipping' ? 'text-primary dark:text-primary-light bg-gray-50 dark:bg-gray-700' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Shipping Addresses
                </button>
                <button 
                  onClick={() => setActiveSection('payment')}
                  className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    activeSection === 'payment' ? 'text-primary dark:text-primary-light bg-gray-50 dark:bg-gray-700' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Payment Methods
                </button>
                <button 
                  onClick={() => setActiveSection('email')}
                  className={`w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    activeSection === 'email' ? 'text-primary dark:text-primary-light bg-gray-50 dark:bg-gray-700' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Email Preferences
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                {activeSection === 'personal' && 'Personal Information'}
                {activeSection === 'password' && 'Password & Security'}
                {activeSection === 'shipping' && 'Shipping Addresses'}
                {activeSection === 'payment' && 'Payment Methods'}
                {activeSection === 'email' && 'Email Preferences'}
              </h2>
              {renderPersonalInformation()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 