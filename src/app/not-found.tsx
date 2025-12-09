// app/not-found.tsx
import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-6">
        Страница не найдена
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        На главную
      </Link>
    </div>
  );
};

export default NotFound;
