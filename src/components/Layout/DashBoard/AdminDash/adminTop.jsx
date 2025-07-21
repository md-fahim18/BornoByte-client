// src/components/Layout/DashBoard/AdminDash/AdminTopbar.jsx
import React from "react";
import { FiBell, FiUser } from "react-icons/fi";
import ThemeSwitcher from "../../../shared/ThemeSwitcher"; // Assuming ThemeSwitcher is in the same directory as Navbar


const AdminTopbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 navbar bg-base-100 text-base-content shadow-md px-4 h-20">
      {/* Centered Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-3xl font-bold text-orange-500 font-berlin whitespace-nowrap">
          BornoByte Control Panel
        </h1>
      </div>

      {/* Right Icon Buttons */}
      <div className="ml-auto flex gap-4 items-center">
        <span className="scale-50">
          <ThemeSwitcher />
        </span>
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
