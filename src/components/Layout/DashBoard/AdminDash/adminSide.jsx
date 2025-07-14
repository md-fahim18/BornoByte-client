import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="text-sm space-y-2">
      <li>
        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded block">Dashboard Home</Link>
      </li>
      <li>
        <Link to="/" className="hover:bg-gray-700 p-2 rounded block">Website Home</Link>
      </li>
      <li>
        <Link to="/dashboard/users" className="hover:bg-gray-700 p-2 rounded block">Manage Users</Link>
      </li>
    </div>
  );
};

export default AdminSidebar;
