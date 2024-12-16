import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateInvoicePDF = (bookingDetails, packageDetails) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // Color palette
  const colors = {
    primary: '#2563EB',      // Blue
    secondary: '#7C3AED',    // Purple
    background: '#F3F4F6',   // Light gray
    text: '#1F2937'          // Dark gray
  };

  // Add background
  doc.setFillColor(colors.background);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Header Section
  doc.setFillColor(colors.primary);
  doc.rect(0, 0, pageWidth, 30, 'F');
  
  // Company Logo (Placeholder - replace with actual logo path if available)
  doc.setTextColor('#FFFFFF');
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('TOUR ADVENTURES', 15, 20);

  // Invoice Title
  doc.setTextColor(colors.text);
  doc.setFontSize(20);
  doc.text('BOOKING INVOICE', pageWidth - 80, 40, { align: 'right' });

  // Invoice Number and Date
  doc.setFontSize(10);
  const invoiceNumber = `INV-${new Date().getTime()}`;
  doc.text(`Invoice Number: ${invoiceNumber}`, pageWidth - 80, 50, { align: 'right' });
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 80, 57, { align: 'right' });

  // Customer Details Section
  doc.setFontSize(12);
  doc.setTextColor(colors.text);
  doc.setFont('helvetica', 'bold');
  doc.text('Customer Details:', 15, 80);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${bookingDetails.name}`, 15, 90);
  doc.text(`Email: ${bookingDetails.email}`, 15, 97);
  doc.text(`Phone: ${bookingDetails.phone}`, 15, 104);

  // Package Details Section
  doc.setFont('helvetica', 'bold');
  doc.text('Booking Details:', 15, 120);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Package: ${packageDetails.title}`, 15, 130);
  doc.text(`Price per Person: $${packageDetails.price.toFixed(2)}`, 15, 137);
  doc.text(`Number of Travelers: ${bookingDetails.travelers}`, 15, 144);

  // Booking Date and Duration
  doc.text(`Booking Date: ${bookingDetails.bookingDate || new Date().toLocaleDateString()}`, 15, 151);
  doc.text(`Tour Duration: ${packageDetails.duration || 'N/A'}`, 15, 158);

  // Pricing Breakdown
  doc.setFont('helvetica', 'bold');
  doc.text('Pricing Breakdown:', 15, 175);

  // Use autoTable for a neat pricing table
  doc.autoTable({
    startY: 185,
    head: [['Description', 'Quantity', 'Unit Price', 'Total']],
    body: [
      [
        packageDetails.title, 
        bookingDetails.travelers, 
        `$${packageDetails.price.toFixed(2)}`, 
        `$${(packageDetails.price * bookingDetails.travelers).toFixed(2)}`
      ]
    ],
    theme: 'striped',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      halign: 'center'
    },
    headStyles: {
      fillColor: colors.secondary,
      textColor: '#FFFFFF'
    }
  });

  // Total Section
  const totalPrice = packageDetails.price * bookingDetails.travelers;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`Total Amount: $${totalPrice.toFixed(2)}`, pageWidth - 80, doc.autoTable.previous.finalY + 20, { align: 'right' });

  // Footer
  doc.setLineWidth(0.5);
  doc.setDrawColor(colors.primary);
  doc.line(15, pageHeight - 30, pageWidth - 15, pageHeight - 30);
  
  doc.setFontSize(8);
  doc.setTextColor(colors.text);
  doc.text('Thank you for choosing Tour Adventures', pageWidth / 2, pageHeight - 20, { align: 'center' });

  // Save the document
  doc.save(`booking-invoice-${new Date().getTime()}.pdf`);
};

export default generateInvoicePDF;