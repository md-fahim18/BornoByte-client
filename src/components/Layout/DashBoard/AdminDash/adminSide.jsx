// src/components/Layout/DashBoard/AdminDash/AdminSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import {
  MdOutlinePendingActions,
  MdLibraryAdd,
  MdManageAccounts,
} from "react-icons/md"; // ✅ All icons imported correctly

const AdminSidebar = () => {
  return (
    <div
      className="bg-base-200 text-base-content shadow-lg w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] p-4 overflow-y-auto z-40"
    >
      {/* 
        top-16 (64px) => matches typical navbar height
        h-[calc(100vh-4rem)] => full height minus topbar (if topbar is h-16)
        overflow-y-auto => lets sidebar scroll independently
        fixed + left-0 => sticks to the left
      */}

      <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center mt-4">
        Admin Panel
      </h2>

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
        <li>
          <Link to="/dashboard/pending-courses" className="flex items-center gap-2 hover:text-orange-500">
            <MdOutlinePendingActions /> Approval Requests
          </Link>
        </li>
        <li>
          <Link to="/dashboard/add-course" className="flex items-center gap-2 hover:text-orange-500">
            <MdLibraryAdd /> Add Course
          </Link>
        </li>
        <li>
          <Link to="/dashboard/manage-courses" className="flex items-center gap-2 hover:text-orange-500">
            <MdManageAccounts /> Manage Courses
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
