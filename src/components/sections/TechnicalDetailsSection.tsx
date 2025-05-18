import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { EventFormData } from '../../types';

interface TechnicalDetailsSectionProps {
  formData: EventFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleVendorChange: (vendorType: 'soundVendor1' | 'soundVendor2' | 'lightingVendor1' | 'lightingVendor2', field: 'name' | 'price', value: string) => void;
}

const TechnicalDetailsSection: React.FC<TechnicalDetailsSectionProps> = ({
  formData,
  handleInputChange,
  handleVendorChange
}) => {
  const [showAdditionalSoundVendor, setShowAdditionalSoundVendor] = useState(false);
  const [showAdditionalLightingVendor, setShowAdditionalLightingVendor] = useState(false);

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
                    {!showAdditionalSoundVendor && (
                      <button
                        type="button"
                        onClick={() => setShowAdditionalSoundVendor(true)}
                        className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Add Another Vendor
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Sound Vendor</label>
                      <input
                        type="text"
                        value={formData.soundVendor1.name}
                        onChange={(e) => handleVendorChange('soundVendor1', 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                        placeholder="Enter Vendor Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Price (LKR)</label>
                      <input
                        type="text"
                        value={formData.soundVendor1.price}
                        onChange={(e) => handleVendorChange('soundVendor1', 'price', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                        placeholder="Enter Price"
                      />
                    </div>
                  </div>
                  {showAdditionalSoundVendor && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Additional Sound Vendor</label>
                        <input
                          type="text"
                          value={formData.soundVendor2.name}
                          onChange={(e) => handleVendorChange('soundVendor2', 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                          placeholder="Enter Vendor Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Price (LKR)</label>
                        <input
                          type="text"
                          value={formData.soundVendor2.price}
                          onChange={(e) => handleVendorChange('soundVendor2', 'price', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                          placeholder="Enter Price"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">Lighting Vendors</h4>
                    {!showAdditionalLightingVendor && (
                      <button
                        type="button"
                        onClick={() => setShowAdditionalLightingVendor(true)}
                        className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Add Another Vendor
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Lighting Vendor</label>
                      <input
                        type="text"
                        value={formData.lightingVendor1.name}
                        onChange={(e) => handleVendorChange('lightingVendor1', 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                        placeholder="Enter Vendor Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Price (LKR)</label>
                      <input
                        type="text"
                        value={formData.lightingVendor1.price}
                        onChange={(e) => handleVendorChange('lightingVendor1', 'price', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                        placeholder="Enter Price"
                      />
                    </div>
                  </div>
                  {showAdditionalLightingVendor && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Additional Lighting Vendor</label>
                        <input
                          type="text"
                          value={formData.lightingVendor2.name}
                          onChange={(e) => handleVendorChange('lightingVendor2', 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                          placeholder="Enter Vendor Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Price (LKR)</label>
                        <input
                          type="text"
                          value={formData.lightingVendor2.price}
                          onChange={(e) => handleVendorChange('lightingVendor2', 'price', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                          placeholder="Enter Price"
                        />
                      </div>
                    </div>
                  )}
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