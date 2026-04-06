import React from 'react';

const SummaryCard = ({ title, amount, type }) => {
  const color = type === 'income' ? 'text-green-600' : type === 'expense' ? 'text-red-600' : 'text-indigo-600';
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:scale-105">
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
      <h2 className={`text-3xl font-extrabold mt-2 ${color}`}>₹{amount.toLocaleString()}</h2>
    </div>
  );
};

export default SummaryCard;