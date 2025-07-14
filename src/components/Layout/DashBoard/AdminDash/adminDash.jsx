import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleRoleChange = (id, newRole) => {
    // Role update logic can be implemented here
    console.log(`Change role of user ${id} to ${newRole}`);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6 text-base-content">All Registered Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div
            key={user._id}
            className="bg-base-200 dark:bg-base-300 rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-14">
                  <span className="text-2xl">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-base-content">{user.name || 'Unnamed User'}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <label className="block mb-2 text-sm font-semibold text-base-content">Role</label>
            <select
              value={user.role || 'student'}
              onChange={(e) => handleRoleChange(user._id, e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
