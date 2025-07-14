import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserShield } from 'react-icons/fa';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // ✅ Fetch users from backend
  useEffect(() => {
    axios.get('http://localhost:3000/users') // Replace with your actual server URL
      .then(res => setUsers(res.data))
      .catch(err => console.error('Failed to fetch users', err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-base-content">All Registered Users</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div
            key={user._id}
            className="bg-base-200 p-4 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition"
          >
            <FaUserShield className="text-orange-500 text-4xl" />
            <div>
              <h3 className="text-lg font-semibold text-base-content">{user.name || 'Unnamed User'}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full mt-1 inline-block">
                Role: {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
