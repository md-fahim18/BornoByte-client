// src/components/Layout/DashBoard/AdminDash/AdminTopbar.jsx
import React from "react";
import { FiBell, FiUser } from "react-icons/fi";

const AdminTopbar = () => {
  return (
    <div className="relative navbar bg-base-100 text-base-content shadow-sm px-4 h-20">
      {/* Centered Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-3xl font-bold text-orange-500 font-berlin whitespace-nowrap">
          BornoByte Admin Panel
        </h1>
      </div>

      {/* Right Icon Buttons */}
      <div className="ml-auto flex gap-4 items-center">
        <button className="btn btn-ghost btn-circle hover:text-orange-500 transition">
          <FiBell className="text-xl" />
        </button>
        <button className="btn btn-ghost btn-circle hover:text-orange-500 transition">
          <FiUser className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default AdminTopbar;
