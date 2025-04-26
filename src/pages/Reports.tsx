import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Download, Calendar } from 'lucide-react';
import ExpensesLineChart from '../components/charts/ExpensesLineChart';
import { useBudget } from '../context/BudgetContext';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('expenses');
  const { budgetData } = useBudget();

  // Format currency
  const formattedCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);

  const reportTypes = [
    { id: 'expenses', name: 'Expenses Report' },
    { id: 'income', name: 'Income Report' },
    { id: 'savings', name: 'Savings Report' },
    { id: 'budget', name: 'Budget Report' }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Financial Reports</h1>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4 mr-2" />
              Select Date Range
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Report Type Selection */}
        <div className="flex space-x-4">
          {reportTypes.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedReport === report.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {report.name}
            </button>
          ))}
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          {/* Chart */}
          <div className="mb-8">
            <ExpensesLineChart data={budgetData.monthlyData} />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-sm font-medium text-blue-600 mb-4">Total Expenses</h3>
              <p className="text-2xl font-bold text-gray-900">{formattedCurrency(budgetData.spent)}</p>
              <p className="text-sm text-gray-600 mt-2">vs {formattedCurrency(budgetData.totalBudget)} budget</p>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-sm font-medium text-green-600 mb-4">Total Savings</h3>
              <p className="text-2xl font-bold text-gray-900">{formattedCurrency(15000)}</p>
              <p className="text-sm text-gray-600 mt-2">+12% from last month</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-sm font-medium text-purple-600 mb-4">Goal Progress</h3>
              <p className="text-2xl font-bold text-gray-900">67%</p>
              <p className="text-sm text-gray-600 mt-2">Average across all goals</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;