// src/components/OrderPage.tsx
import React from 'react';

interface Order {
  id: number;
  customerName: string;
  product: string;
  quantity: number;
  totalPrice: number;
  status: string;
}

const dummyOrders: Order[] = [
  { id: 1, customerName: 'John Doe', product: 'Product A', quantity: 2, totalPrice: 59.98, status: 'Completed' },
  { id: 2, customerName: 'Jane Smith', product: 'Product B', quantity: 1, totalPrice: 49.99, status: 'Pending' },
  { id: 3, customerName: 'Alice Johnson', product: 'Product C', quantity: 3, totalPrice: 59.97, status: 'Shipped' },
];

const OrderPage: React.FC = () => {
  return (
    <div className="bg-gray-100 py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Orders</h2>
        <p className="mt-2 text-lg text-gray-600">View and manage orders.</p>
        
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {dummyOrders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">{order.customerName}</h3>
              <p className="text-gray-600">Product: {order.product}</p>
              <p className="text-gray-600">Quantity: {order.quantity}</p>
              <p className="text-gray-800 font-semibold">Total Price: ${order.totalPrice.toFixed(2)}</p>
              <p className="text-gray-500">Status: {order.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
