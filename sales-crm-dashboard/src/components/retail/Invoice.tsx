// Invoice.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Invoice: React.FC = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;

  const downloadInvoice = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Invoice', 14, 22);
    
    // Customer Info
    doc.setFontSize(12);
    doc.text(`Customer Name: ${orderData.customer.customerName}`, 14, 40);
    doc.text(`Customer Email: ${orderData.customer.customerEmail}`, 14, 50);
    doc.text(`Customer Phone: ${orderData.customer.customerPhone}`, 14, 60);
    
    // Order Details
    doc.text(`Order Date: ${new Date(orderData.orderDate).toLocaleDateString()}`, 14, 80);
    doc.text(`Product: ${orderData.product.productName}`, 14, 90);
    doc.text(`Quantity: ${orderData.quantity}`, 14, 100);
    doc.text(`Total Price: $${orderData.totalPrice}`, 14, 110);
    
    // Transaction Status
    doc.text(`Transaction Status: ${orderData.transactionStatus}`, 14, 120);

    // Download the PDF
    doc.save('invoice.pdf');
  };

  return (
    <div>
      <h1>Invoice</h1>
      {orderData ? (
        <div>
          <h2>Order Details</h2>
          <p><strong>Customer Name:</strong> {orderData.customer.customerName}</p>
          <p><strong>Customer Email:</strong> {orderData.customer.customerEmail}</p>
          <p><strong>Customer Phone:</strong> {orderData.customer.customerPhone}</p>
          <p><strong>Order Date:</strong> {new Date(orderData.orderDate).toLocaleDateString()}</p>
          <p><strong>Product:</strong> {orderData.product.productName}</p>
          <p><strong>Quantity:</strong> {orderData.quantity}</p>
          <p><strong>Total Price:</strong> ${orderData.totalPrice}</p>
          <p><strong>Transaction Status:</strong> {orderData.transactionStatus}</p>
          <button onClick={downloadInvoice}>Download Invoice</button>
        </div>
      ) : (
        <p>No order data available.</p>
      )}
    </div>
  );
};

export default Invoice;
