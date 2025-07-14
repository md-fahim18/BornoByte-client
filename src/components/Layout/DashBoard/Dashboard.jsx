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
import useTeacher from '../../RoleHooks/useTeacher'; // ✅ Added
import TopBar from './Topbar';
import Sidebar from './Sidebar';
import AdminDashboard from './AdminDash/adminDash';
import AdminSidebar from './AdminDash/adminSide';
import AdminTopbar from './AdminDash/adminTop';
import TeacherDashboard from './TeacherDash/teacherDash';
import TeacherSidebar from './TeacherDash/teacherSide';
import TeacherTopbar from './TeacherDash/teacherTop';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher(); // ✅ Role check

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <ul className="space-y-2">

          {/* Admin Sidebar */}
          {isAdmin && (
            <>
              <AdminTopbar />
              <AdminSidebar />
            </>
          )}

          {/* Teacher Sidebar */}
          {!isAdmin && isTeacher && (
            <>
              <TeacherTopbar />
              <TeacherSidebar />
            </>
          )}

          {/* Regular User Sidebar */}
          {!isAdmin && !isTeacher && (
            <>
              <TopBar />
              <Sidebar />
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900">
        <div className="hero min-h-[300px] mb-8">
          <div className="hero-overlay bg-opacity-30"></div>
          <div className="hero-content text-center text-neutral-content">
            <h1 className="text-5xl font-bold text-orange-500 anton-regular">
              {isAdmin ? 'Admin Dashboard' : isTeacher ? 'Teacher Dashboard' : 'User Dashboard'}
            </h1>
          </div>
        </div>

        {/* Dashboard Body */}
        {isAdmin && <AdminDashboard />}
        {isTeacher && !isAdmin && <TeacherDashboard />}
        {/* No user dashboard yet */}
      </div>
    </div>
  );
};

export default Dashboard;
