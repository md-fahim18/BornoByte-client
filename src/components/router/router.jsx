import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Home/Home";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import Dashboard from "../Layout/DashBoard/Dashboard";
import About from "../About Us/About"; // Adjust path as per your structure
import PrivateRoute from "./PrivateRoute";
import CourseDetails from "../CourseDetails/CourseDetails";
import UpdateProfilePicture from "../Layout/DashBoard/UpdateProfilePicture";
import AddCourse from "../Layout/DashBoard/AdminDash/AddCourse";
import AllCourses from "../AllCourses/AllCourses"; // ✅ Adjust path if needed

import ContactUs from "../ContactUs/ContactUs";

import PendingCourses from "../Layout/DashBoard/AdminDash/PendingCourses";
import ManageCourses from "../Layout/DashBoard/AdminDash/ManageCourse";
import CourseDetailsMain from "../CourseDetailsMain/CourseDetailsMain"; // ✅ updated import
import UpdateCourse from "../Layout/DashBoard/AdminDash/UpdateCourse"; // ✅ updated import
import EnrollForm from "../Layout/DashBoard/AdminDash/EnrollForm";
import Settings from "../Layout/DashBoard/settings";
import Inbox from "../Layout/DashBoard/inbox";
import Achievements from "../Layout/DashBoard/achievement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <h1>Page Not Found</h1>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "about",
        element: <About />,
      },
      {
        path: "courses",
        element: <AllCourses />,
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Registration></Registration>,
  },
  {
    path: "contactUs",
    element: <ContactUs></ContactUs>,
  },
  {
    path: "Dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
      children: [
    { path: "settings", element: <Settings /> },
    { path: "inbox", element: <Inbox /> },
    { path: "achievements", element: <Achievements /> },
    { path: "pending-courses", element: <PendingCourses /> },
    { path: "add-course", element: <AddCourse /> },
    { path: "manage-courses", element: <ManageCourses /> },
    { path: "update-course/:id", element: <UpdateCourse /> },
    { path: "enroll-form/:id", element: <EnrollForm /> }
  ]
  },
  {
    path: "/courses/:id",
    element: <CourseDetailsMain />,
  }

]);

export default router;
