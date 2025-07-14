import React, { useState } from 'react';
import AdminSidebar from './adminSide';
import AdminTopbar from './adminTop';
import AdminUsers from './adminUser';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users'); // Can expand later

  return (
    <div className="flex flex-col w-full h-full bg-base-200">
      {/* Top Navigation Bar */}
      <AdminTopbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar onTabChange={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'users' && <AdminUsers />}
          {/* Add more tabs like <ManageCourses />, <SiteStats /> etc. */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
