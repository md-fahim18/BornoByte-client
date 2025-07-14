// src/Layout/DashBoard/Admin/AdminTopBar.jsx
import React from 'react';

const AdminTopBar = () => {
  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-xl font-bold text-amber-600">Admin Panel</h1>
      <div>
        <button className="btn btn-sm btn-outline">Settings</button>
      </div>
    </div>
  );
};

export default AdminTopBar;
