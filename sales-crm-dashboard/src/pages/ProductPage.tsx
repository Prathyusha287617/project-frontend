import React from 'react';
import Sidebar from '../components/retail/Sidebar'; // Adjust the path as necessary
import ProductTable from '../components/retail/ProductTable' // Adjust the path as necessary
import '../styles/ProductPage.module.css' // Create a CSS file for Dashboard styling

const ProductPage: React.FC = () => {
    return (
        <div className="container">
          <ProductTable />
        </div>
      
    );
  };
  
  export default ProductPage;
