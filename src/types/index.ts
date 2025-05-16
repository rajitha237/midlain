export interface Artist {
  name: string;
  practiceRequired: boolean;
  practiceDate: string;
  practiceTime: string;
}

export interface Vendor {
  name: string;
  price: string;
}

export interface EventFormData {
  // Event Details
  eventName: string;
  eventDate: string;
  venue: string;
  artists: Artist[];
  eventTime: string;
  soundCheckDate: string;
  soundCheckTime: string;
  contactPerson: string;
  expectedAttendees: string;
  
  // Client Information
  clientName: string;
  clientNIC: string;
  mobileNumber: string;
  emailAddress: string;
  address: string;
  
  // Technical & Vendor Details
  soundEngineer: string;
  soundEngineerPrice: string;
  soundVendor1: Vendor;
  soundVendor2: Vendor;
  lightingVendor1: Vendor;
  lightingVendor2: Vendor;
  
  // Financials
  quotationPrice: string;
  advancePayment: string;
  balancePayment: string;
  balanceDueDate: string;
}