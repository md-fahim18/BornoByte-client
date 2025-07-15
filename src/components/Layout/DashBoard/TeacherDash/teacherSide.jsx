// src/components/Layout/DashBoard/TeacherDash/TeacherSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiBook, FiClipboard } from "react-icons/fi";

const TeacherSidebar = () => {
  return (
    <div className="bg-base-200 text-base-content shadow-lg w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] p-5 overflow-y-auto">
      <h2 className="text-xl font-semibold text-center text-orange-500 mb-6">Teacher Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="flex items-center gap-2 hover:text-orange-500">
            <FiHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard/assignments" className="flex items-center gap-2 hover:text-orange-500">
            <FiClipboard /> Assignments
          </Link>
        </li>
        <li>
          <Link to="/dashboard/materials" className="flex items-center gap-2 hover:text-orange-500">
            <FiBook /> Materials
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TeacherSidebar;
