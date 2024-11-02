// src/components/BrandCategories.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const getCategoriesByBranchAndBrand = async (branchShortId: string, brandName: string) => {
  try {
    const response = await axios.get<string[]>(`http://localhost:5003/api/product/categories/branch/${branchShortId}/brand/${brandName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Could not fetch categories');
  }
};

const BrandCategories: React.FC = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const branchShortId = localStorage.getItem('branchShortId');
    if (branchShortId && brandName) {
      getCategoriesByBranchAndBrand(branchShortId, brandName)
        .then(setCategories)
        .catch(() => setError('Failed to load categories'));
    }
  }, [brandName]);

  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Categories for {brandName}</h2>
        <p className="mt-2 text-lg text-gray-600">Explore all categories under this brand.</p>
        
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category} className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-700">{category}</h4>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No categories found for this brand.</p>
          )}
        </div>
        
        <Link to="/retail/inventory" className="mt-8 inline-block text-indigo-600 hover:underline">
          Back to Brands
        </Link>
      </div>
    </div>
  );
};

export default BrandCategories;
