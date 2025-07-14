import React from "react";
import { FiBell, FiUser } from "react-icons/fi";

const AdminTopbar = () => {
  return (
    <div className="bg-base-100 dark:bg-gray-900 text-base-content flex justify-between items-center p-4 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="text-2xl font-bold text-amber-500">BornoByte Admin</div>
      <div className="flex items-center gap-4">
        <FiBell className="text-xl hover:text-amber-500 cursor-pointer" />
        <FiUser className="text-xl hover:text-amber-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default AdminTopbar;
