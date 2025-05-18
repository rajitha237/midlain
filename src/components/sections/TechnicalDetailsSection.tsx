import React from 'react';
import { PlusIcon, MinusIcon } from 'lucide-react';
import { EventFormData, Vendor } from '../../types';

interface TechnicalDetailsSectionProps {
  formData: EventFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleVendorArrayChange: (type: 'soundVendors' | 'lightingVendors', index: number, field: keyof Vendor, value: string) => void;
  addVendor: (type: 'soundVendors' | 'lightingVendors') => void;
  removeVendor: (type: 'soundVendors' | 'lightingVendors', index: number) => void;
}

const TechnicalDetailsSection: React.FC<TechnicalDetailsSectionProps> = ({
  formData,
  handleInputChange,
  handleVendorArrayChange,
  addVendor,
  removeVendor
}) => {
  const MAX_VENDORS = 10;

  return (
    <div className="animate-fadeIn pt-4">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-amber-700 text-lg font-bold">🎤</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Technical & Vendor Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sound Engineer</label>
          <input
            type="text"
            name="soundEngineer"
            value={formData.soundEngineer}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
            placeholder="Enter Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sound Engineer Price (LKR)</label>
          <input
            type="text"
            name="soundEngineerPrice"
            value={formData.soundEngineerPrice}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
            placeholder="Enter Price"
          />
        </div>

        <div className="md:col-span-2">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-4">Vendor Information</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">Sound Vendors</h4>
                    {formData.soundVendors.length < MAX_VENDORS && (
                      <button
                        type="button"
                        onClick={() => addVendor('soundVendors')}
                        className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Add Vendor
                      </button>
                    )}
                  </div>
                  {formData.soundVendors.map((vendor, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Sound Vendor {index + 1}
                        </label>
                        <input
                          type="text"
                          value={vendor.name}
                          onChange={(e) => handleVendorArrayChange('soundVendors', index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                          placeholder="Enter Vendor Company Name"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Price (LKR)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={vendor.price}
                            onChange={(e) => handleVendorArrayChange('soundVendors', index, 'price', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                            placeholder="Enter Price"
                          />
                          {formData.soundVendors.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeVendor('soundVendors', index)}
                              className="text-red-500 hover:text-red-700 p-2"
                              title="Remove vendor"
                            >
                              <MinusIcon className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">Lighting Vendors</h4>
                    {formData.lightingVendors.length < MAX_VENDORS && (
                      <button
                        type="button"
                        onClick={() => addVendor('lightingVendors')}
                        className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Add Vendor
                      </button>
                    )}
                  </div>
                  {formData.lightingVendors.map((vendor, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Lighting Vendor {index + 1}
                        </label>
                        <input
                          type="text"
                          value={vendor.name}
                          onChange={(e) => handleVendorArrayChange('lightingVendors', index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                          placeholder="Enter Vendor Company Name"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Price (LKR)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={vendor.price}
                            onChange={(e) => handleVendorArrayChange('lightingVendors', index, 'price', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                            placeholder="Enter Price"
                          />
                          {formData.lightingVendors.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeVendor('lightingVendors', index)}
                              className="text-red-500 hover:text-red-700 p-2"
                              title="Remove vendor"
                            >
                              <MinusIcon className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDetailsSection;