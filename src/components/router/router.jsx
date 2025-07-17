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
  },
  {
    path: "/courses/:id",
    element: <CourseDetailsMain /> 
  },
  {
    path: "/updateProfile",
    element: (
      <PrivateRoute>
        <UpdateProfilePicture></UpdateProfilePicture>
      </PrivateRoute>
    ),
  },
  

    path: "/dashboard/pending-courses",
    element: (
      <PrivateRoute>
        <PendingCourses />
      </PrivateRoute>
    ),
  },
  {

    path: "/dashboard/add-course",
    element: (
      <PrivateRoute>
        <AddCourse />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/manage-courses",
    element: (
      <PrivateRoute>
        <ManageCourses />
      </PrivateRoute>
    ),
  },
]);

export default router;
