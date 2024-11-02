// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 w-64 h-screen p-4 flex flex-col">
    <h1 className="text-white text-2xl font-semibold mb-8">MyApp</h1>
    <nav className="flex-grow">
      <ul className="space-y-4">
        <li>
          <Link to="/retail/main" className="text-gray-200 hover:text-white">
            Home
          </Link>
        </li>
        <li>
          <Link to="/retail/inventory" className="text-gray-200 hover:text-white">
            Inventory
          </Link>
        </li>
        <li>
          <Link to="/retail/product" className="text-gray-200 hover:text-white">
            Product
          </Link>
        </li>
        <li>
          <Link to="/retail/customer" className="text-gray-200 hover:text-white">
            Customer
          </Link>
        </li>
        <li>
          <Link to="/retail/order" className="text-gray-200 hover:text-white">
            Order
          </Link>
        </li>
      </ul>
    </nav>
    <footer className="text-gray-500 text-sm mt-8">
      © 2023 MyApp
    </footer>
  </aside>
  );
};

export default Sidebar;
