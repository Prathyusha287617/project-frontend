// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SideBar from './Sidebar';

interface IProduct {
  productShortId: string;
  brandName: string;
  productName: string;
  productQuantity: number;
  description: string;
  category: string;
  price: number;
  productImage: string;
  inventoryShortId: string;
  branchShortId: string[];
}

// Fetch brands by branch ID
const getBrandsByBranch = async (branchShortId: string) => {
  try {
    const response = await axios.get<string[]>(`http://localhost:5003/api/product/brands/branch/${branchShortId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error('Could not fetch brands');
  }
};

const ProductList: React.FC = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const branchShortId = localStorage.getItem('branchShortId');
    if (branchShortId) {
      getBrandsByBranch(branchShortId)
        .then(setBrands)
        .catch(() => setError('Failed to load brands'))
        .finally(() => setLoading(false));
    } else {
      setError('Branch ID not found in local storage');
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading brands...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex bg-gray-100 py-24 sm:py-32">
      <div className="w-1/4 p-4">
        <SideBar /> {/* Add SideBar here */}
      </div>
      <div className="w-3/4 mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Brands</h2>
        <p className="mt-2 text-lg text-gray-600">Select a brand to view its categories on a new page.</p>
        
        {/* Display brands as clickable cards */}
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand}
              to={`/brands/${brand}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900">{brand}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ProductList;
