// import React from 'react';
// import Sidebar from './Sidebar';
// import TopBar from './Topbar';
// const Dashboard = () => {
//     return (
//         <div>
//             <TopBar></TopBar>
//             <Sidebar></Sidebar>
//         </div>
//     );
// };
// export default Dashboard;

import React from 'react';
import useAdmin from '../../RoleHooks/useAdmin';
import useTeacher from '../../RoleHooks/useTeacher'; // ✅ Added teacher role hook
import TopBar from './Topbar';
import Sidebar from './Sidebar';
import AdminDashboard from './AdminDash/adminDash';
import AdminSidebar from './AdminDash/adminSide';
import AdminTopbar from './AdminDash/adminTop';
import TeacherDashboard from './TeacherDash/teacherDash';
import TeacherSidebar from './TeacherDash/teacherSide';
import TeacherTopbar from './TeacherDash/teacherTop';

// ✅ Import user dashboard components
import UserDashboard from './UserDash/userDash';
import UserSidebar from './UserDash/userSide';
import UserTopbar from './UserDash/userTop';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();

  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
      {/* Top Bar */}
      {isAdmin && <AdminTopbar />}
      {!isAdmin && isTeacher && <TeacherTopbar />}
      {!isAdmin && !isTeacher && <UserTopbar />} {/* ✅ User Topbar */}

      <div className="flex flex-1">
        {/* Sidebar */}
        {isAdmin && <AdminSidebar />}
        {!isAdmin && isTeacher && <TeacherSidebar />}
        {!isAdmin && !isTeacher && <UserSidebar />} {/* ✅ User Sidebar */}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {isAdmin && <AdminDashboard />}
          {isTeacher && !isAdmin && <TeacherDashboard />}
          {!isAdmin && !isTeacher && <UserDashboard />} {/* ✅ User Dashboard */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
