import React from 'react';
import { CalculatorIcon } from 'lucide-react';
import { EventFormData } from '../../types';

interface FinancialsSectionProps {
  formData: EventFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCalculateBalance: () => void;
  calculatedBalance: string;
}

const FinancialsSection: React.FC<FinancialsSectionProps> = ({
  formData,
  handleInputChange,
  handleCalculateBalance,
  calculatedBalance
}) => {
  return (
    <div className="animate-fadeIn pt-4">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-green-700 text-lg font-bold">💰</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Financials</h2>
      </div>

      <div className="bg-green-50 p-5 rounded-lg border border-green-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quotation Total Price (LKR)</label>
            <input
              type="number"
              name="quotationPrice"
              value={formData.quotationPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              placeholder="Enter Total Amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Advance Payment (LKR)</label>
            <input
              type="number"
              name="advancePayment"
              value={formData.advancePayment}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              placeholder="Enter Advance Amount"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Balance Payment (LKR)</label>
            <div className="flex">
              <input
                type="text"
                name="balancePayment"
                value={formData.balancePayment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                placeholder="Calculate Balance"
                readOnly
              />
              <button
                type="button"
                onClick={handleCalculateBalance}
                className="ml-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200"
                title="Calculate Balance"
              >
                <CalculatorIcon className="h-5 w-5" />
              </button>
            </div>
            {calculatedBalance !== formData.balancePayment && (
              <div className="text-sm text-gray-500 mt-1">
                Calculated balance: LKR {calculatedBalance}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Balance Payment Due Date</label>
            <input
              type="date"
              name="balanceDueDate"
              value={formData.balanceDueDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialsSection;