import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import useAxiosSecure from "../../../components/Auth/useAxiosSecure";

const AdminDashboard = () => {
  const [axiosSecure] = useAxiosSecure();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="p-6 bg-base-100 dark:bg-gray-900 text-base-content rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">All Registered Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-base-200 dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-2">
              <FaUserCircle className="text-5xl text-amber-500" />
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="mt-2">
              <label className="block mb-1 font-medium">Role</label>
              <select
                className="select select-bordered w-full"
                value={user.role}
                onChange={(e) => console.log("Future: Set role", e.target.value)}
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
