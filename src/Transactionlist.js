import React from 'react';

const TransactionList = ({ transactions, role }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Date</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Category</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Type</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-blue-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-600">{t.date}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.category}</td>
              <td className="px-6 py-4">
                <span className={`text-xs px-2 py-1 rounded-full font-bold ₹{t.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {t.type.toUpperCase()}
                </span>
              </td>
              <td className={`px-6 py-4 text-sm font-bold text-right ₹{t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {t.type === 'income' ? '+' : '-'}₹{t.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {role === 'Viewer' && (
        <div className="p-4 bg-yellow-50 text-center text-xs text-yellow-700 font-medium">
          Read-only mode enabled for Viewers.
        </div>
      )}
    </div>
  );
};

export default TransactionList;