// src/components/Layout/DashBoard/AdminDash/AdminSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";

const AdminSidebar = () => {
  return (
    <div className="bg-base-200 h-screen p-4 shadow-lg text-base-content">
      <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="flex items-center gap-2 hover:text-orange-500">
            <FiHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="flex items-center gap-2 hover:text-orange-500">
            <FiUsers /> Users
          </Link>
        </li>
        <li>
          <Link to="/dashboard/settings" className="flex items-center gap-2 hover:text-orange-500">
            <FiSettings /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
