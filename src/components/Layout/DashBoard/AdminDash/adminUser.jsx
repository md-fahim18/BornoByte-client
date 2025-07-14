import React, { useEffect, useState } from 'react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from backend (MongoDB)
  useEffect(() => {
    fetch('http://localhost:3000/users') // ✅ Update with your server port if needed
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error loading users:', err));
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
        Registered Users ({users.length})
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white dark:bg-base-300 p-5 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="mb-3">
              <div className="text-lg font-semibold text-orange-500">
                {user.name || 'Unnamed User'}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
            <div className="mt-3">
              <span className="badge badge-outline badge-warning">
                Role: {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
