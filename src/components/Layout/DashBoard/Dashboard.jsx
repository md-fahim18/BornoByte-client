import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import useAdmin from "../../RoleHooks/useAdmin";
import useTeacher from "../../RoleHooks/useTeacher";

import Sidebar from "./Sidebar";
import AdminDashboard from "./AdminDash/adminDash";
import AdminSidebar from "./AdminDash/adminSide";
import AdminTopbar from "./AdminDash/adminTop";
import TeacherDashboard from "./TeacherDash/teacherDash";
import TeacherSidebar from "./TeacherDash/teacherSide";
import TeacherTopbar from "./TeacherDash/teacherTop";
import Settings from "./settings";
import Inbox from "./inbox.jsx";
import Achievement from "./achievement.jsx";

//admin
import AddCourse from "./AdminDash/AddCourse.jsx"; // ✅ You already have this
import PendingCourses from "./AdminDash/PendingCourses.jsx"; // ✅ If not, adjust the path
import ManageCourses from "./AdminDash/ManageCourse.jsx"; // ✅ This is your management panel

// ✅ User role
import UserDashboard from "./UserDash/userDash.jsx";
import UserSidebar from "./UserDash/userSide";
import UserTopbar from "./UserDash/userTop";
import AdminEnrollRequests from "./AdminDash/AdminEnrollRequests.jsx";
import AdminCourseForm from "./AdminDash/HomePageCourseSec/AdminCourseForm.jsx";
import HomeCourses from "./AdminDash/HomePageCourseSec/HomeCourses.jsx";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();
  const [adminTab, setAdminTab] = useState("users"); // default section
  const [teacherTab, setTeacherTab] = useState("teacher"); // default section for teacher
  const [userTab, setUserTab] = useState("default"); // default section

  // Set layout adjustments if using fixed topbar/sidebar
  const isFixed = true; // enable fixed layout globally
  const topOffset = isFixed ? "pt-16" : ""; // topbar height
  const leftOffset = isFixed ? "ml-64" : ""; // sidebar width

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      {/* Top Bar (Fixed position handled inside each topbar component) */}
      {isAdmin && <AdminTopbar />}
      {!isAdmin && isTeacher && <TeacherTopbar />}
      {!isAdmin && !isTeacher && <UserTopbar />}

      {/* Sidebar (Fixed handled inside sidebar components) */}
      {isAdmin && <AdminSidebar setAdminTab={setAdminTab} />}
      {!isAdmin && isTeacher && (
        <TeacherSidebar setTeacherTab={setTeacherTab} />
      )}
      {!isAdmin && !isTeacher && <UserSidebar setUserTab={setUserTab} />}

      {/* Main Content */}
      <div className={`p-6 ${topOffset} ${leftOffset}`}>
        {isAdmin && (
          <>
            {adminTab === "users" && <AdminDashboard />}
            {adminTab === "add-course" && <AddCourse />}
            {adminTab === "pending" && <PendingCourses />}
            {adminTab === "manage" && <ManageCourses />}
            {adminTab === "enrollReq" && <AdminEnrollRequests />}
            {adminTab === "settings" && <Settings />}
            {adminTab === "homepage-Courses" && <HomeCourses />}
          </>
        )}

        {/* Teacher */}
        {isTeacher && !isAdmin && (
          <>
            {teacherTab === "teacher" && <TeacherDashboard />}
            {teacherTab === "inbox" && <Inbox />}
            {teacherTab === "settings" && <Settings />}
          </>
        )}

        {/* User */}
        {!isAdmin && !isTeacher && (
          <>
            {userTab === "default" && <UserDashboard />}
            {userTab === "inbox" && <Inbox />}
            {userTab === "settings" && <Settings />}
            {userTab === "achievement" && <Achievement />}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
