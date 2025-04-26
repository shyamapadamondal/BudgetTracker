import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import ExpensesLineChart from '../components/charts/ExpensesLineChart';
import ExpenseCategories from '../components/widgets/ExpenseCategories';
import BudgetVsSpending from '../components/widgets/BudgetVsSpending';
import { useBudget } from '../context/BudgetContext';

const Dashboard: React.FC = () => {
  const { budgetData } = useBudget();
  
  return (
    <MainLayout>
      {/* Monthly Expenses Chart Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Expenses Overview</h2>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <ExpensesLineChart data={budgetData.monthlyData} />
        </div>
      </div>
      
      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseCategories />
        <BudgetVsSpending />
      </div>
    </MainLayout>
  );
};

export default Dashboard;