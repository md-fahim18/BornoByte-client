import React from 'react';
import useAdmin from '../../RoleHooks/useAdmin';
import useTeacher from '../../RoleHooks/useTeacher';
import TopBar from './Topbar';
import Sidebar from './Sidebar';
import AdminDashboard from './AdminDash/adminDash';
import AdminSidebar from './AdminDash/adminSide';
import AdminTopbar from './AdminDash/adminTop';
import TeacherDashboard from './TeacherDash/teacherDash';
import TeacherSidebar from './TeacherDash/teacherSide';
import TeacherTopbar from './TeacherDash/teacherTop';

// ✅ User role
import UserDashboard from './UserDash/userDash.jsx';
import UserSidebar from './UserDash/userSide';
import UserTopbar from './UserDash/userTop';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();

  // Set layout adjustments if using fixed topbar/sidebar
  const isFixed = true; // enable fixed layout globally
  const topOffset = isFixed ? 'pt-16' : ''; // topbar height
  const leftOffset = isFixed ? 'ml-64' : ''; // sidebar width

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      {/* Top Bar (Fixed position handled inside each topbar component) */}
      {isAdmin && <AdminTopbar />}
      {!isAdmin && isTeacher && <TeacherTopbar />}
      {!isAdmin && !isTeacher && <UserTopbar />}

      {/* Sidebar (Fixed handled inside sidebar components) */}
      {isAdmin && <AdminSidebar />}
      {!isAdmin && isTeacher && <TeacherSidebar />}
      {!isAdmin && !isTeacher && <UserSidebar />}

      {/* Main Content */}
      <div className={`p-6 ${topOffset} ${leftOffset}`}>
        {isAdmin && <AdminDashboard />}
        {isTeacher && !isAdmin && <TeacherDashboard />}
        {!isAdmin && !isTeacher && <UserDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
