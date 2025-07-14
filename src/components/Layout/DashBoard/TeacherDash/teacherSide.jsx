// teacherSide.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TeacherSidebar = () => (
  <div>
    <ul className="space-y-2">
      <li><Link to="/dashboard/upload" className="hover:text-amber-500">Upload Course</Link></li>
      <li><Link to="/dashboard/manage" className="hover:text-amber-500">Manage Content</Link></li>
    </ul>
  </div>
);

export default TeacherSidebar;
