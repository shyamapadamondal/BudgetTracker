// Monthly data for the chart
export const monthlyData = [
  { month: 'Jan', amount: 32000 },
  { month: 'Feb', amount: 28000 },
  { month: 'Mar', amount: 36000 },
  { month: 'Apr', amount: 30000 },
  { month: 'May', amount: 25000 },
  { month: 'Jun', amount: 33000 },
  { month: 'Jul', amount: 31000 },
  { month: 'Aug', amount: 29000 },
  { month: 'Sep', amount: 34000 },
  { month: 'Oct', amount: 32500 },
  { month: 'Nov', amount: 38000 },
  { month: 'Dec', amount: 41000 },
];

// Top expense categories
export const expenseCategories = [
  { id: 1, name: 'Housing', amount: 15000, percentage: 35, color: '#3b82f6' },
  { id: 2, name: 'Food', amount: 9000, percentage: 20, color: '#14b8a6' },
  { id: 3, name: 'Transportation', amount: 6000, percentage: 14, color: '#f59e0b' },
  { id: 4, name: 'Entertainment', amount: 4500, percentage: 10, color: '#8b5cf6' },
  { id: 5, name: 'Utilities', amount: 3500, percentage: 8, color: '#ec4899' },
];

// Budget vs Spending data
export const budgetVsSpending = [
  { category: 'Housing', budgeted: 18000, spent: 15000 },
  { category: 'Food', budgeted: 8000, spent: 9000 },
  { category: 'Transportation', budgeted: 5000, spent: 6000 },
  { category: 'Entertainment', budgeted: 3000, spent: 4500 },
  { category: 'Utilities', budgeted: 4000, spent: 3500 },
];

// Savings goals
export const savingsGoals = [
  { id: 1, name: 'Vacation', target: 50000, current: 35000, color: '#3b82f6' },
  { id: 2, name: 'New Car', target: 300000, current: 150000, color: '#14b8a6' },
  { id: 3, name: 'Emergency Fund', target: 100000, current: 90000, color: '#f59e0b' },
];

// Calendar expenses
export const calendarExpenses = Array.from({ length: 30 }, (_, i) => ({
  date: i + 1,
  amount: Math.floor(Math.random() * 2000) + 500,
}));

// Mock budget summary data
export const mockBudgetData = {
  totalBudget: 45000,
  spent: 38000,
  remaining: 7000,
  percentSpent: 84,
  monthlyData,
  expenseCategories,
  budgetVsSpending,
  savingsGoals,
  calendarExpenses,
};