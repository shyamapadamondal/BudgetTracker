import React from 'react';
import { ChevronDown, Bell, User } from 'lucide-react';
import { useBudget } from '../../context/BudgetContext';

const TopBar: React.FC = () => {
  const { filterPeriod, setFilterPeriod } = useBudget();
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePeriodChange = (period: any) => {
    setFilterPeriod(period);
    setIsOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">My Budget Dashboard</h1>
      
      <div className="flex items-center space-x-6">
        {/* Filter dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 px-4 py-2 rounded-lg transition-colors"
          >
            <span>{filterPeriod}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="py-1">
                {['This Month', 'Last Month', 'Custom Range'].map((period) => (
                  <li key={period}>
                    <button
                      onClick={() => handlePeriodChange(period)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        filterPeriod === period ? 'text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {period}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Notification icon */}
        <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
            3
          </span>
        </button>
        
        {/* User profile */}
        <button className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">Alex Johnson</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;