import React, { useState } from 'react';
import { PrinterIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import EventDetailsSection from './sections/EventDetailsSection';
import ClientInfoSection from './sections/ClientInfoSection';
import TechnicalDetailsSection from './sections/TechnicalDetailsSection';
import FinancialsSection from './sections/FinancialsSection';
import { Artist, EventFormData } from '../types';

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
    soundVendor1: { name: '', price: '' },
    soundVendor2: { name: '', price: '' },
    lightingVendor1: { name: '', price: '' },
    lightingVendor2: { name: '', price: '' },
    
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

  const handleVendorChange = (
    vendorType: 'soundVendor1' | 'soundVendor2' | 'lightingVendor1' | 'lightingVendor2',
    field: 'name' | 'price',
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [vendorType]: {
        ...prev[vendorType],
        [field]: value
      }
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

  const generatePDF = () => {
    const pdf = new jsPDF();
    const margin = 20;
    let yPos = margin;

    // Set font styles
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('Event Job Card', margin, yPos);
    yPos += 10;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text('Midlane Entertainment', margin, yPos);
    yPos += 20;

    // Event Details
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Event Details', margin, yPos);
    yPos += 10;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text(`Event Name: ${formData.eventName}`, margin, yPos);
    yPos += 7;
    pdf.text(`Date: ${formData.eventDate}`, margin, yPos);
    yPos += 7;
    pdf.text(`Venue: ${formData.venue}`, margin, yPos);
    yPos += 7;
    pdf.text(`Event Time: ${formData.eventTime}`, margin, yPos);
    yPos += 7;
    pdf.text(`Sound Check: ${formData.soundCheckDate} ${formData.soundCheckTime}`, margin, yPos);
    yPos += 15;

    // Artists
    pdf.setFont('helvetica', 'bold');
    pdf.text('Artists', margin, yPos);
    yPos += 7;
    pdf.setFont('helvetica', 'normal');
    formData.artists.forEach((artist, index) => {
      pdf.text(`${index + 1}. ${artist.name}`, margin, yPos);
      if (artist.practiceRequired) {
        yPos += 5;
        pdf.text(`   Practice: ${artist.practiceDate} ${artist.practiceTime}`, margin, yPos);
      }
      yPos += 7;
    });
    yPos += 8;

    // Client Information
    pdf.setFont('helvetica', 'bold');
    pdf.text('Client Information', margin, yPos);
    yPos += 10;
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Name: ${formData.clientName}`, margin, yPos);
    yPos += 7;
    pdf.text(`NIC: ${formData.clientNIC}`, margin, yPos);
    yPos += 7;
    pdf.text(`Mobile: ${formData.mobileNumber}`, margin, yPos);
    yPos += 7;
    pdf.text(`Email: ${formData.emailAddress}`, margin, yPos);
    yPos += 7;
    pdf.text(`Address: ${formData.address}`, margin, yPos);
    yPos += 15;

    // Technical Details
    pdf.setFont('helvetica', 'bold');
    pdf.text('Technical Details', margin, yPos);
    yPos += 10;
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Sound Engineer: ${formData.soundEngineer}`, margin, yPos);
    yPos += 7;
    pdf.text(`Sound Engineer Price: LKR ${formData.soundEngineerPrice}`, margin, yPos);
    yPos += 15;

    // Vendors
    pdf.setFont('helvetica', 'bold');
    pdf.text('Vendors', margin, yPos);
    yPos += 10;
    pdf.setFont('helvetica', 'normal');
    
    if (formData.soundVendor1.name) {
      pdf.text(`Sound Vendor 1: ${formData.soundVendor1.name} - LKR ${formData.soundVendor1.price}`, margin, yPos);
      yPos += 7;
    }
    if (formData.soundVendor2.name) {
      pdf.text(`Sound Vendor 2: ${formData.soundVendor2.name} - LKR ${formData.soundVendor2.price}`, margin, yPos);
      yPos += 7;
    }
    if (formData.lightingVendor1.name) {
      pdf.text(`Lighting Vendor 1: ${formData.lightingVendor1.name} - LKR ${formData.lightingVendor1.price}`, margin, yPos);
      yPos += 7;
    }
    if (formData.lightingVendor2.name) {
      pdf.text(`Lighting Vendor 2: ${formData.lightingVendor2.name} - LKR ${formData.lightingVendor2.price}`, margin, yPos);
      yPos += 7;
    }
    yPos += 8;

    // Financials
    pdf.setFont('helvetica', 'bold');
    pdf.text('Financial Details', margin, yPos);
    yPos += 10;
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Quotation Price: LKR ${formData.quotationPrice}`, margin, yPos);
    yPos += 7;
    pdf.text(`Advance Payment: LKR ${formData.advancePayment}`, margin, yPos);
    yPos += 7;
    pdf.text(`Balance Payment: LKR ${formData.balancePayment}`, margin, yPos);
    yPos += 7;
    pdf.text(`Balance Due Date: ${formData.balanceDueDate}`, margin, yPos);

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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGKSURBVHic7d2xTQNBEIbR2T9FUAIl0AElUAodQAmUQAmUQAmUYEqgBDpwB3tgWXfSrjT7nvRFd4EivJqVVqfVAgAAAAAAAAAAAAAAAICbm9baPK21H7/+5/xora3T/f1XzC/ew3H+nO7xv2B+8Z6O8/d0j/8F84v3dJy/p3v8L5hfvKfj/D3d43/B/OI9Hefv6R7/C+YX7+k4f0/3+F8wv3hPx/l7usf/gvnFezrO39M9/hfML97Tcf6e7vG/YH7xno7z93SP/wXzi/d0nL+ne/wvmF+8p+P8Pd3jf8H84j0d5+/pHv8L5hfv6Th/T/f4XzC/eE/H+Xu6x/+C+cV7Os7f0z3+F8wv3tNx/p7u8b9gfvGejvP3dI//BfOL93Scv6d7/C+YX7yn4/w93eN/wfziPR3n7+ke/wvmF+/pOH9P9/hfML94T8f5e7rH/4L5xXs6zt/TPf4XzC/e03H+nu7xv2B+8Z6O8/d0j/8F84v3dJy/p3v8L5hfvKfj/D3d438BAAAAAAAAAAAAAACw1voEb/RE0dKwjT4AAAAASUVORK5CYII=" 
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
            handleVendorChange={handleVendorChange}
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