// src/components/Dashboard/DashboardPage.tsx
import React, { useEffect, useState } from 'react';

const DashboardPage: React.FC = () => {
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  
  const [loadingCustomers, setLoadingCustomers] = useState<boolean>(true);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  
  const [errorCustomers, setErrorCustomers] = useState<string | null>(null);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);
  const [errorOrders, setErrorOrders] = useState<string | null>(null);

  const branchShortId = sessionStorage.getItem('branchShortId'); // Assuming you're storing branchShortId in session storage

  useEffect(() => {
    if (!branchShortId) {
      setErrorCustomers('Branch ID is not available');
      setErrorProducts('Branch ID is not available');
      setErrorOrders('Branch ID is not available');
      setLoadingCustomers(false);
      setLoadingProducts(false);
      setLoadingOrders(false);
      return;
    }

    const fetchCustomers = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/customers/count/${branchShortId}`);
        if (!response.ok) throw new Error('Failed to fetch total customers');
        const data = await response.json();
        setTotalCustomers(data.totalCustomers);
      } catch (error: any) {
        setErrorCustomers(error.message);
      } finally {
        setLoadingCustomers(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5003/api/product/count/${branchShortId}`);
        if (!response.ok) throw new Error('Failed to fetch total products');
        const data = await response.json();
        setTotalProducts(data.totalProducts);
      } catch (error: any) {
        setErrorProducts(error.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5004/api/orders/count/${branchShortId}`);
        if (!response.ok) throw new Error('Failed to fetch total orders');
        const data = await response.json();
        setTotalOrders(data.totalOrders);
      } catch (error: any) {
        setErrorOrders(error.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchCustomers();
    fetchProducts();
    fetchOrders();
  }, [branchShortId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-bold">Total Customers</h3>
        {loadingCustomers ? (
          <p>Loading...</p>
        ) : errorCustomers ? (
          <p className="text-red-500">{errorCustomers}</p>
        ) : (
          <p className="text-3xl">{totalCustomers}</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-bold">Total Products</h3>
        {loadingProducts ? (
          <p>Loading...</p>
        ) : errorProducts ? (
          <p className="text-red-500">{errorProducts}</p>
        ) : (
          <p className="text-3xl">{totalProducts}</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-bold">Total Orders</h3>
        {loadingOrders ? (
          <p>Loading...</p>
        ) : errorOrders ? (
          <p className="text-red-500">{errorOrders}</p>
        ) : (
          <p className="text-3xl">{totalOrders}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
