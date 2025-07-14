import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="min-h-full bg-base-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 p-5">
      <h2 className="text-2xl font-bold text-amber-500 mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className={`flex items-center gap-2 text-base-content hover:text-amber-500 transition ${
              location.pathname === "/" && "font-semibold text-amber-600"
            }`}
          >
            <FiHome /> Home
          </Link>
        </li>
        <li>
          <a className="flex items-center gap-2 text-base-content hover:text-amber-500 transition">
            <FiUsers /> Users
          </a>
        </li>
        <li>
          <a className="flex items-center gap-2 text-base-content hover:text-amber-500 transition">
            <FiSettings /> Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
