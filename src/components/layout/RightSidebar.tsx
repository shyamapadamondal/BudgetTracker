import React from 'react';
import BudgetSummary from '../widgets/BudgetSummary';
import Calendar from '../widgets/Calendar';
import GoalsList from '../widgets/GoalsList';

const RightSidebar: React.FC = () => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="space-y-6">
        <BudgetSummary />
        <Calendar />
        <GoalsList />
      </div>
    </div>
  );
};

export default RightSidebar;