import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { ShoppingBag, Home, Car, Music, Zap } from 'lucide-react';

// Map category names to icons
const categoryIcons: { [key: string]: React.FC<{ className: string }> } = {
  'Housing': Home,
  'Food': ShoppingBag,
  'Transportation': Car,
  'Entertainment': Music,
  'Utilities': Zap,
};

const ExpenseCategories: React.FC = () => {
  const { budgetData } = useBudget();
  const { expenseCategories } = budgetData;
  
  // Format currency
  const formattedCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Expense Categories</h2>
      
      <div className="space-y-4">
        {expenseCategories.map(category => {
          const Icon = categoryIcons[category.name] || ShoppingBag;
          
          return (
            <div key={category.id} className="group">
              <div className="flex items-center mb-1">
                <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3 group-hover:bg-blue-50 transition-colors">
                  <Icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">
                      {category.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {formattedCurrency(category.amount)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out"
                        style={{ 
                          width: `${category.percentage}%`,
                          backgroundColor: category.color
                        }}
                      ></div>
                    </div>
                    <span className="ml-3 text-xs font-medium text-gray-500">
                      {category.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseCategories;