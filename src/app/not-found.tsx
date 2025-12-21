// app/not-found.tsx
import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button/Button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-6">
        Страница не найдена
      </p>
      <Link 
        href="/" 
      >
        <Button>
        На главную
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
