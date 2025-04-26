import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { Target } from 'lucide-react';

const GoalsList: React.FC = () => {
  const { budgetData } = useBudget();
  const { savingsGoals } = budgetData;
  
  const formattedCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-500" />
          <h2 className="text-base font-semibold text-gray-800">Popular Goals</h2>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {savingsGoals.map(goal => {
          const percentage = Math.round((goal.current / goal.target) * 100);
          
          return (
            <div key={goal.id} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Target className="h-3 w-3 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {goal.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-blue-600">
                  {percentage}%
                </span>
              </div>
              
              <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: goal.color
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>{formattedCurrency(goal.current)}</span>
                <span>{formattedCurrency(goal.target)}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
        Add New Goal
      </button>
    </div>
  );
};

export default GoalsList;