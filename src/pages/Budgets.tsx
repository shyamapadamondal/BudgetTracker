import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Plus, AlertCircle } from 'lucide-react';
import { useBudget } from '../context/BudgetContext';

const Budgets: React.FC = () => {
  const { budgetData } = useBudget();
  const { budgetVsSpending } = budgetData;

  // Format currency
  const formattedCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Budget Categories</h1>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Create Budget
          </button>
        </div>

        {/* Budget Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgetVsSpending.map((budget, index) => {
            const percentage = Math.round((budget.spent / budget.budgeted) * 100);
            const isOverBudget = budget.spent > budget.budgeted;

            return (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{budget.category}</h3>
                    <p className="text-sm text-gray-500 mt-1">Monthly Budget</p>
                  </div>
                  {isOverBudget && (
                    <div className="flex items-center text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Over Budget</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Spent</span>
                    <span className="font-medium text-gray-900">{formattedCurrency(budget.spent)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budgeted</span>
                    <span className="font-medium text-gray-900">{formattedCurrency(budget.budgeted)}</span>
                  </div>

                  <div className="relative pt-2">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          {percentage}% Used
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-gray-600">
                          {formattedCurrency(budget.budgeted - budget.spent)} remaining
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-100">
                      <div
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          isOverBudget ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                      View Details
                    </button>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      Adjust Budget
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Budgets;