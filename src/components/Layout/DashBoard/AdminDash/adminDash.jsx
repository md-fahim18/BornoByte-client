import React, { useEffect, useState } from 'react';
import UserCard from '../../../User/userCard';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users") // Your actual server URL
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const updated = await res.json();
      if (updated.modifiedCount > 0) {
        setUsers(prev =>
          prev.map(user =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      }
    } catch (err) {
      console.error("Failed to change role", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-base-content">All Registered Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <UserCard key={user._id} user={user} onRoleChange={handleRoleChange} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
