import React from 'react';

const AdminSidebar = ({ onTabChange }) => {
  return (
    <aside className="w-64 bg-base-100 border-r border-gray-300 dark:border-gray-700 p-6">
      <nav className="flex flex-col gap-4">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => onTabChange('users')}
        >
          👤 View Users
        </button>
        {/* Future: Add more nav items */}
        {/* <button onClick={() => onTabChange('courses')}>Manage Courses</button> */}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
