import React from 'react';
import { useBudget } from '../../context/BudgetContext';

const BudgetVsSpending: React.FC = () => {
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
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Budget vs Spending</h2>
      
      <div className="space-y-4">
        {budgetVsSpending.map((item, index) => {
          const percentage = Math.round((item.spent / item.budgeted) * 100);
          const isOverBudget = item.spent > item.budgeted;
          
          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-800">{item.category}</span>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-blue-600'}`}>
                    {percentage}%
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    of budget
                  </span>
                </div>
              </div>
              
              <div className="relative h-5 w-full bg-gray-100 rounded-lg overflow-hidden">
                {/* Budgeted bar (background) */}
                <div className="absolute top-0 left-0 h-full w-full flex items-center px-3">
                  <span className="text-xs font-medium text-gray-600">
                    Budget: {formattedCurrency(item.budgeted)}
                  </span>
                </div>
                
                {/* Spent bar (foreground) */}
                <div 
                  className={`absolute top-0 left-0 h-full flex items-center px-3 transition-all duration-500 ease-out ${
                    isOverBudget ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                >
                  <span className="text-xs font-medium truncate">
                    Spent: {formattedCurrency(item.spent)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetVsSpending;