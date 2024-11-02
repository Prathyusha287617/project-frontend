// src/components/ProductPage.tsx
import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const dummyProducts: Product[] = [
  { id: 1, name: 'Product A', description: 'Description for Product A', price: 29.99, category: 'Electronics', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product B', description: 'Description for Product B', price: 49.99, category: 'Books', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product C', description: 'Description for Product C', price: 19.99, category: 'Clothing', image: 'https://via.placeholder.com/150' },
];

const ProductPage: React.FC = () => {
  return (
    <div className="bg-gray-100 py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Products</h2>
        <p className="mt-2 text-lg text-gray-600">Browse our product catalog.</p>
        
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {dummyProducts.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-semibold">${product.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">{product.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
