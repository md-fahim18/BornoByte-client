import React from 'react';
import { FiBell, FiUser } from 'react-icons/fi';

const AdminTopbar = () => {
  return (
    <div className="w-full px-6 py-4 bg-base-100 shadow flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-amber-600">BornoByte Admin</h1>
      <div className="flex gap-4 items-center text-base-content">
        <FiBell size={22} className="hover:text-amber-500 cursor-pointer" />
        <FiUser size={22} className="hover:text-amber-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default AdminTopbar;
