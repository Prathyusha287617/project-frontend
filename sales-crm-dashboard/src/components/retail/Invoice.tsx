// Invoice.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

const Invoice: React.FC = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;

  const downloadInvoice = () => {
    const doc = new jsPDF();
  
    // Set margins
    const margin = 10; // Margin from the edge of the page
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    // Draw a border around the entire page
    doc.setDrawColor(0); // Black color
    doc.setLineWidth(1);
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
  
    // Title
    doc.setFontSize(40);
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice', pageWidth / 2, margin + 20, { align: 'center' });
  
    // Customer Info
    doc.setFontSize(22);
    const customerInfoY = margin + 40;
    doc.text('Customer Information', margin + 30, customerInfoY);
    doc.setFontSize(15);
    doc.text(`Name: ${orderData.customer.customerName}`, margin + 30, customerInfoY + 10);
    doc.text(`Email: ${orderData.customer.customerEmail}`, margin + 30, customerInfoY + 20);
    doc.text(`Phone: ${orderData.customer.customerPhone}`, margin + 30, customerInfoY + 30);
  
    // Order Details
    const orderDetailsY = customerInfoY + 50;
    doc.setFontSize(22);
    doc.text('Order Details', margin + 30, orderDetailsY);
    doc.setFontSize(15);
    doc.text(`Order Date: ${new Date(orderData.orderDate).toLocaleDateString()}`, margin + 30, orderDetailsY + 10);
    doc.text(`Product: ${orderData.product.productName}`, margin + 30, orderDetailsY + 20);
    doc.text(`Quantity: ${orderData.quantity}`, margin + 30, orderDetailsY + 30);
    doc.text(`Total Price: $${orderData.totalPrice}`, margin + 30, orderDetailsY + 40);
    
    // Transaction Status
    doc.text(`Transaction Status: ${orderData.transactionStatus}`, margin + 30, orderDetailsY + 50);

    doc.text('Note : Thank ypu for choosing us',pageWidth / 2, orderDetailsY + 80, { align: 'center' })

    // Download the PDF
    doc.save('invoice.pdf');
  };
  
  const exportPDF = () =>{
    const input = document.getElementById('invoice-content'); // Target the invoice content

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('invoice.pdf'); // Save the generated PDF
      });
    }
  }

  return (
    <div  className='m-5 p-5 border-2 w-2/4' style={{justifySelf : 'center'}}>
      <div></div>
      {orderData ? (
        <div id='invoice-content' className='my-5 p-5' style={{justifySelf : 'center'}}>
          <h1 className='text-center font-bold'>Invoice</h1>
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
        </div>
      ) : (
        <p>No order data available.</p>
      )}
      <button className='my-4' style={{marginLeft : '15rem'}} onClick={exportPDF}>Download Invoice</button>
    </div>
  );
};

export default Invoice;