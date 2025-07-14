import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users") // Adjust if needed
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  const handleRoleChange = async (email, newRole) => {
    try {
      await axios.patch(`http://localhost:3000/users/update-role`, {
        email,
        role: newRole,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Role update failed", error);
    }
  };

  return (
    <div className="bg-base-100 text-base-content p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-base-200 p-5 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={
                  user.avatar ||
                  "https://i.ibb.co/5vZBq2c/default-avatar.png"
                }
                alt="avatar"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-semibold text-lg">{user.name || "Unnamed"}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Role
              </label>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.email, e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
