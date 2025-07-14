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
    <div className="flex min-h-screen bg-base-100 text-base-content">
      {/* Sidebar */}
      <div className="w-64 bg-base-200 border-r border-base-300 p-4">
        <h1 className="text-xl font-bold mb-6 text-orange-500 tracking-wide">Dashboard</h1>
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
      <div className="flex-1 bg-base-100 dark:bg-gray-900 p-6 transition duration-300">
        {/* Dashboard Hero Header */}
        <div className="hero min-h-[180px] rounded-lg bg-base-200 text-center mb-8">
          <div className="hero-content text-center">
            <div>
              <h1 className="text-4xl font-bold text-orange-500 mb-2">
                {isAdmin ? 'Admin Dashboard' : isTeacher ? 'Teacher Dashboard' : 'User Dashboard'}
              </h1>
              <p className="text-base-content opacity-70">Welcome to your personalized control panel</p>
            </div>
          </div>
        </div>

        {/* Role-Specific Main Content */}
        {isAdmin && <AdminDashboard />}
        {isTeacher && !isAdmin && <TeacherDashboard />}
        {/* Regular user dashboard coming soon */}
      </div>
    </div>
  );
};

export default Dashboard;
