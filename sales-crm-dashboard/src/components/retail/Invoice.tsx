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

  return(
  <div className='m-5 p-5 border-2 w-2/4' style={{justifySelf : 'center'}}>
  <h1 className='text-center'>Invoice</h1>
  {orderData ? (
    <div className='my-5 w-3/4' style={{justifySelf : 'center'}}>
      <h2 className='py-4'>Order Details</h2>
      <table >
        <tbody>
          <tr>
            <td>
            <strong>Customer Name:</strong>
            </td>
            <td>
            {orderData.customer.customerName}
            </td>
          </tr>
          <tr>
            <td>
            <strong>Customer Email:</strong>               
            </td>
            <td>
            {orderData.customer.customerEmail}
            </td>
          </tr>
          <tr>
            <td>
            <strong>Customer Phone:</strong>             
            </td>
            <td>
            {orderData.customer.customerPhone}
            </td>
          </tr>
          <tr>
            <td>
            <strong>Order Date:</strong>             
            </td>
            <td>
            {new Date(orderData.orderDate).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td>
            <strong>Product:</strong>             
            </td>
            <td>
            {orderData.product.productName}
            </td>
          </tr>
          <tr>
            <td>
            <strong>Quantity:</strong>             
            </td>
            <td>
            {orderData.quantity}
            </td>
          </tr>
          <tr>
            <td>
            <strong>Total Price:</strong>             
            </td>
            <td>
            ${orderData.totalPrice}
            </td>
          </tr>
          <tr>
            <td>
            <strong>Transaction Status:</strong>             
            </td>
            <td>
            {orderData.transactionStatus}
            </td>
          </tr>
        </tbody>
      </table>

      <button className='my-4' onClick={downloadInvoice}>Download Invoice</button>
    </div>
  ) : (
    <p>No order data available.</p>
  )}
</div>
);
};

export default Invoice;
