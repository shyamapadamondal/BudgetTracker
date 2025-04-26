import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const Calendar: React.FC = () => {
  const { budgetData } = useBudget();
  const { calendarExpenses } = budgetData;
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const formattedCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const firstDayOfMonth = getFirstDayOfMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  const getExpenseForDay = (day: number) => {
    const expense = calendarExpenses.find(expense => expense.date === day);
    return expense ? expense.amount : 0;
  };

  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const expense = getExpenseForDay(day);
    const hasExpense = expense > 0;
    
    days.push(
      <div 
        key={day}
        onClick={() => setSelectedDay(day)}
        className={`
          h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-sm
          ${hasExpense ? 'hover:bg-blue-50' : 'hover:bg-gray-50'}
          ${selectedDay === day ? 'bg-blue-500 text-white' : ''}
          ${hasExpense && selectedDay !== day ? 'bg-blue-50 text-blue-700' : ''}
          transition-colors duration-150
        `}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="w-4 h-4 text-blue-500" />
        <h2 className="text-base font-semibold text-gray-800">Expense Calendar</h2>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prevMonth}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-gray-500" />
        </button>
        
        <h3 className="text-sm font-medium">
          {monthName} {currentMonth.getFullYear()}
        </h3>
        
        <button 
          onClick={nextMonth}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(name => (
          <div key={name} className="text-xs text-center font-medium text-gray-500">
            {name}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
      
      {selectedDay && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-600">
            Expenses on {selectedDay} {monthName}:
          </p>
          <p className="text-lg font-semibold text-blue-600 mt-1">
            {formattedCurrency(getExpenseForDay(selectedDay))}
          </p>
        </div>
      )}
    </div>
  );
};

export default Calendar;