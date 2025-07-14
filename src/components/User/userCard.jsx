import React from 'react';
import { FaUserEdit } from 'react-icons/fa';

const UserCard = ({ user, onRoleChange }) => {
  const avatar = user?.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;

  return (
    <div className="bg-base-200 rounded-lg shadow p-4 flex items-center gap-4">
      <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full" />
      <div className="flex-1">
        <h3 className="font-bold text-lg">{user.name}</h3>
        <p className="text-sm text-base-content">{user.email}</p>
      </div>
      <select
        value={user.role}
        onChange={(e) => onRoleChange(user._id, e.target.value)}
        className="select select-bordered"
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <FaUserEdit className="ml-2 text-gray-500" />
    </div>
  );
};

export default UserCard;
