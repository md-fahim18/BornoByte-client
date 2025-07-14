import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import useAxiosSecure from "../../../Auth/useAxiosSecure"; // Update path as needed

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    // Later: connect to backend to update role
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-base-content">
      {users.map((user) => (
        <div
          key={user._id}
          className="bg-base-200 rounded-lg shadow-md p-5 hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          <div className="flex items-center gap-4 mb-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-14 h-14 text-gray-400" />
            )}
            <div>
              <h3 className="font-semibold">{user.name || "Unknown User"}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Role:</label>
            <select
              className="select select-sm mt-1 w-full bg-base-100 text-base-content border border-gray-300 dark:border-gray-600"
              value={user.role}
              onChange={(e) => handleRoleChange(user._id, e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
