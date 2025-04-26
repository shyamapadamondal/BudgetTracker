import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  PiggyBank, 
  Target, 
  BarChart, 
  Settings 
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, text: 'Dashboard', path: '/dashboard' },
  { icon: Receipt, text: 'Transactions', path: '/transactions' },
  { icon: PiggyBank, text: 'Budgets', path: '/budgets' },
  { icon: Target, text: 'Goals', path: '/goals' },
  { icon: BarChart, text: 'Reports', path: '/reports' },
  { icon: Settings, text: 'Settings', path: '/settings' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 bg-[#f7f9fc] h-screen flex flex-col p-4 border-r border-gray-200">
      <div className="mb-8 flex items-center">
        <PiggyBank className="w-8 h-8 text-blue-500 mr-2" />
        <h1 className="text-xl font-bold text-gray-800">BudgetTracker</h1>
      </div>
      
      <nav className="flex-1">
        <ul>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={index} className="mb-2">
                <button 
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 hover:bg-blue-50 ${
                    isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="font-semibold text-sm">{item.text}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-5 bg-blue-600 rounded-full"></span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="mt-auto p-4 bg-blue-50 rounded-xl">
        <p className="text-sm text-gray-600 font-medium">Need help?</p>
        <p className="text-xs text-gray-500 mt-1">Contact our support team for assistance with your budgeting.</p>
        <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Sidebar;