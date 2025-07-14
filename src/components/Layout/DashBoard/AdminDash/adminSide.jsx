import React from 'react';
import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';

const AdminSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-base-200 p-6 shadow-md">
      <h2 className="text-xl font-bold text-amber-600 mb-6">Admin Panel</h2>
      <ul className="space-y-4 text-base">
        <li className="flex items-center gap-3 hover:text-amber-600 cursor-pointer">
          <FiHome /> Home
        </li>
        <li className="flex items-center gap-3 hover:text-amber-600 cursor-pointer">
          <FiUsers /> Users
        </li>
        <li className="flex items-center gap-3 hover:text-amber-600 cursor-pointer">
          <FiSettings /> Settings
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
