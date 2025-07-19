// src/components/Layout/DashBoard/TeacherDash/TeacherSidebar.jsx
import React from "react";
import { FiHome, FiInbox, FiSettings } from "react-icons/fi";

const TeacherSidebar = ({ setTeacherTab }) => {
  return (
    <div className="bg-base-200 text-base-content shadow-lg w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] p-5 overflow-y-auto">
      <h2 className="text-xl font-semibold text-center text-orange-500 mb-6">Teacher Panel</h2>
      <ul className="space-y-4">
        <li>
          <a href="/" className="flex items-center gap-2 hover:text-orange-500">
            <FiHome /> Home
          </a>
        </li>
        <li>
          <button
            onClick={() => setTeacherTab("inbox")}
            className="flex items-center gap-2 hover:text-orange-500"
          >
            <FiInbox /> Inbox
          </button>
        </li>
        <li>
          <button
            onClick={() => setTeacherTab("settings")}
            className="flex items-center gap-2 hover:text-orange-500"
          >
            <FiSettings /> Settings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TeacherSidebar;
