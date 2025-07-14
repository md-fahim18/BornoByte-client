// src/Layout/DashBoard/AdminDash/AdminSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-white">Admin Panel</h2>
      <ul className="space-y-2">
        <li><Link to="/" className="hover:text-amber-400">Home</Link></li>
        <li><Link to="/dashboard" className="hover:text-amber-400">Dashboard</Link></li>
        {/* Add more admin links here */}
      </ul>
    </div>
  );
};

export default AdminSidebar;
