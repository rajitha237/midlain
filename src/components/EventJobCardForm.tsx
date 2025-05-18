import React, { useState } from 'react';
import { PrinterIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import EventDetailsSection from './sections/EventDetailsSection';
import ClientInfoSection from './sections/ClientInfoSection';
import TechnicalDetailsSection from './sections/TechnicalDetailsSection';
import FinancialsSection from './sections/FinancialsSection';
import { Artist, EventFormData, Vendor } from '../types';

const EventJobCardForm: React.FC = () => {
  const [formData, setFormData] = useState<EventFormData>({
    // Event Details
    eventName: '',
    eventDate: '',
    venue: '',
    artists: [{ name: '', practiceRequired: false, practiceDate: '', practiceTime: '' }],
    eventTime: '',
    soundCheckDate: '',
    soundCheckTime: '',
    contactPerson: '',
    expectedAttendees: '',
    
    // Client Information
    clientName: '',
    clientNIC: '',
    mobileNumber: '',
    emailAddress: '',
    address: '',
    
    // Technical & Vendor Details
    soundEngineer: '',
    soundEngineerPrice: '',
    soundVendors: [{ name: '', price: '' }],
    lightingVendors: [{ name: '', price: '' }],
    
    // Financials
    quotationPrice: '',
    advancePayment: '',
    balancePayment: '',
    balanceDueDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVendorArrayChange = (
    type: 'soundVendors' | 'lightingVendors',
    index: number,
    field: keyof Vendor,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map((vendor, i) =>
        i === index ? { ...vendor, [field]: value } : vendor
      )
    }));
  };

  const addVendor = (type: 'soundVendors' | 'lightingVendors') => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], { name: '', price: '' }]
    }));
  };

  const removeVendor = (type: 'soundVendors' | 'lightingVendors', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleArtistChange = (index: number, field: keyof Artist, value: string | boolean) => {
    const newArtists = [...formData.artists];
    newArtists[index] = {
      ...newArtists[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      artists: newArtists
    }));
  };

  const addArtist = () => {
    setFormData(prev => ({
      ...prev,
      artists: [...prev.artists, { name: '', practiceRequired: false, practiceDate: '', practiceTime: '' }]
    }));
  };

  const removeArtist = (index: number) => {
    if (formData.artists.length > 1) {
      const newArtists = [...formData.artists];
      newArtists.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        artists: newArtists
      }));
    }
  };

  const calculateBalancePayment = () => {
    const quotation = parseFloat(formData.quotationPrice) || 0;
    const advance = parseFloat(formData.advancePayment) || 0;
    return (quotation - advance).toFixed(2);
  };

  const handleCalculateBalance = () => {
    const balance = calculateBalancePayment();
    setFormData(prev => ({
      ...prev,
      balancePayment: balance
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateTotalVendorCosts = () => {
    const soundEngineerCost = parseFloat(formData.soundEngineerPrice) || 0;
    const soundVendorsCost = formData.soundVendors.reduce((total, vendor) => 
      total + (parseFloat(vendor.price) || 0), 0);
    const lightingVendorsCost = formData.lightingVendors.reduce((total, vendor) => 
      total + (parseFloat(vendor.price) || 0), 0);
    
    return {
      soundEngineerCost,
      soundVendorsCost,
      lightingVendorsCost,
      totalCost: soundEngineerCost + soundVendorsCost + lightingVendorsCost
    };
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Add logo as watermark
    const logoWidth = 40;
    const logoHeight = 40;
    
    // Add watermark
    pdf.saveGraphicsState();
    pdf.setGState(new pdf.GState({ opacity: 0.1 }));
    pdf.addImage('/Square.png', 'PNG', 
      pageWidth/2 - logoWidth/2, 
      pageHeight/2 - logoHeight/2, 
      logoWidth, 
      logoHeight
    );
    pdf.restoreGraphicsState();

    // Header with logo and title
    pdf.setFillColor(0, 0, 0);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    // Add logo to header
    pdf.addImage('/Square.png', 'PNG', pageWidth - 50, 5, 30, 30);
    
    // Add red accent
    pdf.setFillColor(254, 0, 0);
    pdf.rect(0, 40, pageWidth, 10, 'F');

    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.text('EVENT JOB CARD', 20, 25);
    
    // Reset text color
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);

    let yPos = 70;

    // Client Information
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Client Information:', 20, yPos);
    yPos += 10;
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Name: ${formData.clientName}`, 20, yPos);
    pdf.text(`Date: ${formData.eventDate}`, pageWidth - 80, yPos);
    yPos += 8;
    
    pdf.text(`NIC: ${formData.clientNIC}`, 20, yPos);
    yPos += 8;
    pdf.text(`Contact: ${formData.mobileNumber}`, 20, yPos);
    yPos += 8;
    pdf.text(`Email: ${formData.emailAddress}`, 20, yPos);
    yPos += 8;
    pdf.text(`Address: ${formData.address}`, 20, yPos);
    yPos += 20;

    // Event Details
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Event Details:', 20, yPos);
    yPos += 10;
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Event Name: ${formData.eventName}`, 20, yPos);
    yPos += 8;
    pdf.text(`Venue: ${formData.venue}`, 20, yPos);
    yPos += 8;
    pdf.text(`Event Time: ${formData.eventTime}`, 20, yPos);
    yPos += 8;
    pdf.text(`Sound Check: ${formData.soundCheckDate} ${formData.soundCheckTime}`, 20, yPos);
    yPos += 20;

    // Technical Details
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Technical Details:', 20, yPos);
    yPos += 10;

    // Create table for vendors
    const tableHeaders = ['Vendor Type', 'Name', 'Price (LKR)'];
    
    // Combine all vendors into a single array for the table
    const tableData = [
      ['Sound Engineer', formData.soundEngineer, formData.soundEngineerPrice],
      ...formData.soundVendors.map((vendor, index) => 
        [`Sound Vendor ${index + 1}`, vendor.name, vendor.price]
      ),
      ...formData.lightingVendors.map((vendor, index) => 
        [`Lighting Vendor ${index + 1}`, vendor.name, vendor.price]
      ),
    ];

    // Table styling
    pdf.setFillColor(254, 0, 0);
    pdf.rect(20, yPos, pageWidth - 40, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    
    // Draw table headers
    let xPos = 20;
    tableHeaders.forEach((header, index) => {
      pdf.text(header, xPos + (index * 57), yPos + 7);
    });
    
    // Reset text color and draw table data
    pdf.setTextColor(0, 0, 0);
    yPos += 15;
    
    tableData.forEach((row) => {
      xPos = 20;
      row.forEach((cell, index) => {
        pdf.text(cell || '-', xPos + (index * 57), yPos);
      });
      yPos += 10;
    });

    // Add a new page for financial summary
    pdf.addPage();
    yPos = 50;

    // Financial Summary Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('FINANCIAL SUMMARY', pageWidth/2, yPos, { align: 'center' });
    yPos += 30;

    // Calculate vendor costs
    const costs = calculateTotalVendorCosts();

    // Create detailed financial summary box
    const boxWidth = 160;
    const boxHeight = 140;
    const boxX = (pageWidth - boxWidth) / 2;
    const boxStartY = yPos;

    // Draw background box
    pdf.setFillColor(245, 245, 245);
    pdf.rect(boxX, boxStartY, boxWidth, boxHeight, 'F');

    // Add content to the box
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    yPos += 20;

    // Vendor Costs Section
    pdf.text('Vendor Costs:', boxX + 10, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    yPos += 15;
    pdf.text(`Sound Engineer: LKR ${costs.soundEngineerCost.toFixed(2)}`, boxX + 20, yPos);
    yPos += 10;
    pdf.text(`Sound Vendors: LKR ${costs.soundVendorsCost.toFixed(2)}`, boxX + 20, yPos);
    yPos += 10;
    pdf.text(`Lighting Vendors: LKR ${costs.lightingVendorsCost.toFixed(2)}`, boxX + 20, yPos);
    yPos += 10;
    pdf.text(`Total Vendor Cost: LKR ${costs.totalCost.toFixed(2)}`, boxX + 20, yPos);
    yPos += 20;

    // Payment Details Section
    pdf.setFont('helvetica', 'bold');
    pdf.text('Payment Details:', boxX + 10, yPos);
    pdf.setFont('helvetica', 'normal');
    yPos += 15;
    pdf.text(`Quotation Amount: LKR ${formData.quotationPrice}`, boxX + 20, yPos);
    yPos += 10;
    pdf.text(`Advance Payment: LKR ${formData.advancePayment}`, boxX + 20, yPos);
    yPos += 10;
    pdf.text(`Balance Payment: LKR ${formData.balancePayment}`, boxX + 20, yPos);

    // Add balance due date below the box
    yPos = boxStartY + boxHeight + 20;
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Balance Payment Due Date: ${formData.balanceDueDate}`, pageWidth/2, yPos, { align: 'center' });

    // Add signature line at the bottom
    yPos = pageHeight - 50;
    pdf.line(pageWidth/2 - 50, yPos, pageWidth/2 + 50, yPos);
    yPos += 10;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Authorized Signature', pageWidth/2, yPos, { align: 'center' });

    // Add red accent at bottom
    pdf.setFillColor(254, 0, 0);
    pdf.rect(0, pageHeight - 15, pageWidth, 15, 'F');

    // Save the PDF
    pdf.save(`${formData.eventName || 'event'}_job_card.pdf`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    generatePDF();
    alert('Event job card created successfully! PDF has been generated.');
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 print:p-1 max-w-4xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden print:shadow-none transform transition-all duration-300 hover:shadow-xl print:hover:shadow-none mb-8">
        <div className="bg-black text-white py-6 px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img 
                src="/Square.png"
                alt="Midlane Entertainment Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold mb-1">Event Job Card</h1>
                <p className="text-sm text-gray-300">Midlane Entertainment</p>
              </div>
            </div>
            <button 
              onClick={handlePrint}
              className="bg-[#fe0000] hover:bg-[#cc0000] text-white p-2 rounded-lg transition duration-200 flex items-center print:hidden"
              title="Print job card"
            >
              <PrinterIcon className="h-5 w-5" />
              <span className="ml-2 hidden md:inline">Print</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          <EventDetailsSection 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleArtistChange={handleArtistChange}
            addArtist={addArtist}
            removeArtist={removeArtist}
          />
          
          <ClientInfoSection 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
          
          <TechnicalDetailsSection 
            formData={formData} 
            handleInputChange={handleInputChange}
            handleVendorArrayChange={handleVendorArrayChange}
            addVendor={addVendor}
            removeVendor={removeVendor}
          />
          
          <FinancialsSection 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleCalculateBalance={handleCalculateBalance}
            calculatedBalance={calculateBalancePayment()}
          />
          
          <div className="pt-6 border-t border-gray-200 flex justify-end space-x-4 print:hidden">
            <button 
              type="button" 
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-[#fe0000] hover:bg-[#cc0000] text-white rounded-lg transition-colors duration-200"
            >
              Save Job Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventJobCardForm;