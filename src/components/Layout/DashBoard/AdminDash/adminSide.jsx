// src/components/Layout/DashBoard/AdminDash/AdminSidebar.jsx
import React from "react";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import { MdOutlinePendingActions, MdLibraryAdd, MdManageAccounts } from "react-icons/md";

const AdminSidebar = ({ setAdminTab }) => {
  return (
    <div className="bg-base-200 text-base-content shadow-lg w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] p-4 overflow-y-auto z-40 border-r border-base-300">
      {/* Sidebar Title */}
      <h2 className="text-2xl font-bold mb-8 text-orange-500 text-center mt-4">
        Admin Panel
      </h2>

      {/* Sidebar Menu */}
      <ul className="space-y-4 text-[17px] font-medium">
        <li>
          <a
            href="/"
            className="flex items-center gap-3 w-full text-left hover:text-orange-500 transition"
          >
            <FiHome className="text-lg" /> Home
          </a>
        </li>


        <li>
          <button
            onClick={() => setAdminTab("users")}
            className="flex items-center gap-3 w-full text-left hover:text-orange-500 transition"
          >
            <FiUsers className="text-lg" /> All Users
          </button>
        </li>

        <li>
          <button
            onClick={() => setAdminTab("pending")}
            className="flex items-center gap-3 w-full text-left hover:text-orange-500 transition"
          >
            <MdOutlinePendingActions className="text-xl" /> Approval Requests
          </button>
        </li>

        <li>
          <button
            onClick={() => setAdminTab("add-course")}
            className="flex items-center gap-3 w-full text-left hover:text-orange-500 transition"
          >
            <MdLibraryAdd className="text-xl" /> Add Course
          </button>
        </li>

        <li>
          <button
            onClick={() => setAdminTab("manage")}
            className="flex items-center gap-3 w-full text-left hover:text-orange-500 transition"
          >
            <MdManageAccounts className="text-xl" /> Manage Courses
          </button>
        </li>

        <li>
          <button
            onClick={() => setAdminTab("settings")}
            className="flex items-center gap-3 w-full text-left hover:text-orange-500 transition"
          >
            <FiSettings className="text-lg" /> Settings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
