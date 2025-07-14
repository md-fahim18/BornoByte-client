// src/Layout/DashBoard/AdminDash/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users from MongoDB
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {users.map((user, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-lg font-semibold text-base-content mb-2">{user.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Email: {user.email}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Role: <span className="font-bold">{user.role}</span></p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
