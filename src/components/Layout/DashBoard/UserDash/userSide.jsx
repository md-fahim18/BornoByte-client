import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiBookOpen } from "react-icons/fi";

const UserSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-base-200 p-4 border-r dark:border-gray-700">
      <h2 className="text-2xl font-bold text-amber-500 mb-6">User Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className="flex items-center gap-2 text-base-content hover:text-amber-500 transition"
          >
            <FiHome /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/courses"
            className="flex items-center gap-2 text-base-content hover:text-amber-500 transition"
          >
            <FiBookOpen /> My Courses
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
