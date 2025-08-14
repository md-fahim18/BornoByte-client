import React from "react";
import { FiHome, FiBookOpen, FiSettings, FiInbox } from "react-icons/fi";
import { MdEmojiEvents } from "react-icons/md";

const UserSidebar = ({ setUserTab }) => {
  return (
    <div className="w-64 min-h-screen bg-base-200 p-4 border-r dark:border-gray-700 fixed top-16 left-0 h-[calc(100vh-4rem)]">
      <h2 className="text-2xl font-bold text-amber-500 mb-6">User Menu</h2>
      <ul className="space-y-4">
        <li>
          <a href="/" className="flex items-center gap-2 hover:text-amber-500">
            <FiHome /> Home
          </a>
        </li>
        <li>
          <button
            onClick={() => setUserTab("default")}
            className="flex items-center gap-2 hover:text-amber-500"
          >
            <FiBookOpen /> My Courses
          </button>
        </li>
        <li>
          <button
            onClick={() => setUserTab("inbox")}
            className="flex items-center gap-2 hover:text-amber-500"
          >
            <FiInbox /> Inbox
          </button>
        </li>
        <li>
          <button
            onClick={() => setUserTab("settings")}
            className="flex items-center gap-2 hover:text-amber-500"
          >
            <FiSettings /> Settings
          </button>
        </li>
        <li>
          <button
            onClick={() => setUserTab("achievement")}
            className="flex items-center gap-2 hover:text-amber-500"
          >
            <MdEmojiEvents /> Achievement
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
