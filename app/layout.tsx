import React from 'react';
import './globals.css';
import Providers from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 