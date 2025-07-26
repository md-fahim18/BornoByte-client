// src/components/Layout/DashBoard/AdminDash/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserShield } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://bornobyte.vercel.app/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleRoleChange = (id, newRole) => {
    axios.patch(
      `https://bornobyte.vercel.app/users/role/${id}`,
      { role: newRole },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          alert("User role updated successfully");
          setUsers((prev) =>
            prev.map((user) =>
              user._id === id ? { ...user, role: newRole } : user
            )
          );
        }
      })
      .catch((err) => {
        console.error("Failed to update role:", err);
        alert("Role update failed");
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    axios
      .delete(`https://bornobyte.vercel.app/users/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        if (res.data.deletedCount > 0) {
          alert("User deleted successfully!");
          setUsers((prev) => prev.filter((user) => user._id !== id));
        }
      })
      .catch((err) => {
        console.error("Failed to delete user", err);
        alert("User deletion failed");
      });
  };

  return (
    <div className="p-6 pt-24 bg-base-100 min-h-screen text-base-content">
      <h2 className="text-3xl font-semibold mb-6 text-center">All Registered Users</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-base-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Avatar & Info */}
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user.photo ||
                      `https://api.dicebear.com/7.x/thumbs/svg?seed=${user.email}`
                    }
                    alt="User Avatar"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold flex items-center gap-1">
                  <FaUserShield className="text-orange-400" /> {user.name}
                </h3>
                <p className="text-sm flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <MdOutlineMail /> {user.email}
                </p>
              </div>
            </div>

            {/* Role Selector */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                className="select select-bordered w-full"
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>

            {/* Delete Button */}
            <div className="mt-4">
              <button
                onClick={() => handleDelete(user._id)}
                className="btn btn-error btn-sm w-full"
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
