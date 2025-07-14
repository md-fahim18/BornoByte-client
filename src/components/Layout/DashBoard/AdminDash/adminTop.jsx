// src/components/Layout/DashBoard/AdminDash/AdminTopbar.jsx
import React from "react";
import { FiBell, FiUser } from "react-icons/fi";

const AdminTopbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm text-base-content">
      <div className="flex-1 px-4 font-semibold text-xl text-orange-500">BornoByte Admin</div>
      <div className="flex gap-4 items-center px-4">
        <FiBell className="text-xl hover:text-orange-500 cursor-pointer" />
        <FiUser className="text-xl hover:text-orange-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default AdminTopbar;
