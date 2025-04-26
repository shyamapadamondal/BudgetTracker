import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { Circle } from 'lucide-react';

const BudgetSummary: React.FC = () => {
  const { budgetData } = useBudget();
  const { totalBudget, spent, remaining, percentSpent } = budgetData;

  const isPositive = remaining >= 0;
  const formattedCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (percentSpent / 100) * circumference;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Circle className="w-4 h-4 text-blue-500" />
        <h2 className="text-base font-semibold text-gray-800">Budget Summary</h2>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="relative">
          <svg width="96" height="96" viewBox="0 0 96 96">
            <circle 
              cx="48" 
              cy="48" 
              r={radius} 
              fill="none" 
              stroke="#e5e7eb" 
              strokeWidth="8" 
            />
            <circle 
              cx="48" 
              cy="48" 
              r={radius} 
              fill="none" 
              stroke={isPositive ? "#14b8a6" : "#ef4444"} 
              strokeWidth="8" 
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              strokeLinecap="round"
              transform="rotate(-90 48 48)"
            />
            <text 
              x="48" 
              y="48" 
              dominantBaseline="middle" 
              textAnchor="middle" 
              fontSize="16" 
              fontWeight="bold" 
              fill={isPositive ? "#14b8a6" : "#ef4444"}
            >
              {percentSpent}%
            </text>
          </svg>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Budget</span>
          <span className="font-semibold text-gray-900">{formattedCurrency(totalBudget)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Spent</span>
          <span className="font-semibold text-gray-900">{formattedCurrency(spent)}</span>
        </div>
        
        <div className="pt-2 border-t">
          <div className="flex justify-between">
            <span className="text-gray-600">Remaining</span>
            <span className={`font-semibold ${isPositive ? 'text-teal-600' : 'text-red-600'}`}>
              {formattedCurrency(remaining)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;