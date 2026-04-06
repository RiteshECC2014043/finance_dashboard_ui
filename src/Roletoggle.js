import React from 'react';

const RoleToggle = ({ role, setRole }) => {
  return (
    <div className="inline-flex bg-gray-200 p-1 rounded-xl">
      <button 
        onClick={() => setRole('Admin')}
        className={`px-4 py-2 rounded-lg text-sm font-bold transition ${role === 'Admin' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
      >Admin</button>
      <button 
        onClick={() => setRole('Viewer')}
        className={`px-4 py-2 rounded-lg text-sm font-bold transition ${role === 'Viewer' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}
      >Viewer</button>
    </div>
  );
};

export default RoleToggle;