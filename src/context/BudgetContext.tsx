import React, { createContext, useContext, useState } from 'react';
import { mockBudgetData } from '../data/mockData';

type FilterPeriod = 'This Month' | 'Last Month' | 'Custom Range';

interface BudgetContextType {
  budgetData: typeof mockBudgetData;
  filterPeriod: FilterPeriod;
  setFilterPeriod: (period: FilterPeriod) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('This Month');
  
  const value = {
    budgetData: mockBudgetData,
    filterPeriod,
    setFilterPeriod,
  };
  
  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};