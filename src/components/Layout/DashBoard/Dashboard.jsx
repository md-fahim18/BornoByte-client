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
import TopBar from './Topbar';
import Sidebar from './Sidebar';

// ✅ Modular Admin Components
import AdminDashboard from './AdminDash/adminDash';
import AdminTopbar from './AdminDash/adminTop';
import AdminSidebar from './AdminDash/adminSide';

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <ul className="space-y-2">

          {/* Admin Sidebar */}
          {isAdmin && (
            <>
              {/* ✅ Admin Sidebar Component */}
              <AdminSidebar />
            </>
          )}

          {/* Regular User Sidebar */}
          {!isAdmin && (
            <>
              {/* user sidebar */}
              <Sidebar />
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-0">
        {/* Top Bar */}
        {isAdmin ? <AdminTopbar /> : <TopBar />}

        {/* Admin Only Content */}
        {isAdmin && (
          <>
            <AdminDashboard />
          </>
        )}

        {/* Optional Hero for Dashboard Identity */}
        <div
          className="hero min-h-[200px] mb-4"
        >
          <div className="hero-overlay bg-opacity-20"></div>
          <div className="hero-content text-center text-neutral-content">
            <h1 className="text-4xl font-bold text-orange-500 anton-regular">
              {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
