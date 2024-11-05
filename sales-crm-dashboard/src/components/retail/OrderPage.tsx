import React, { useEffect, useState } from 'react';
 
interface Order {
  orderShortID: number;
  customerShortId: string;
  productShortId: string;
  quantity: number;
  totalPrice: number;
  transactionStatus: string;
  orderDate: string; // Format: YYYY-MM-DD
}
 
const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
 
  // Fetch orders from the backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5004/api/orders'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
 
    fetchOrders();
  }, []);
 
  // Filter orders based on date range
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.orderDate);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
 
    return (!from || orderDate >= from) && (!to || orderDate <= to);
  });
 
  if (loading) {
    return <div className="text-center">Loading orders...</div>;
  }
 
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
 
  return (
    <div className="bg-gray-100 py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Orders</h2>
        <p className="mt-2 text-lg text-gray-600">View and manage orders within a date range.</p>
 
        {/* Date Filters */}
        <div className="flex gap-4 mt-6">
          <div>
            <label className="block text-gray-600 font-semibold mb-2">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-semibold mb-2">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
 
        {/* Orders Table */}
        <div className="mt-10 overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Customer ID</th>
                <th className="px-4 py-2 border-b">Product ID</th>
                <th className="px-4 py-2 border-b">Quantity</th>
                <th className="px-4 py-2 border-b">Total Price</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.orderShortID} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b text-center">{order.orderShortID}</td>
                    <td className="px-4 py-2 border-b text-center">{order.customerShortId}</td>
                    <td className="px-4 py-2 border-b text-center">{order.productShortId}</td>
                    <td className="px-4 py-2 border-b text-center">{order.quantity}</td>
                    <td className="px-4 py-2 border-b text-center">{order.totalPrice.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b text-center">{order.transactionStatus}</td>
                    <td className="px-4 py-2 border-b text-center">{order.orderDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                    No orders found in the selected date range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
 
export default OrderPage;