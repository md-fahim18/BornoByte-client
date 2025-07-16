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
        element: <AllCourses />
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
    path: "Dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
  },
  {
    path: "/courses/:id",
    element: <CourseDetails></CourseDetails>,
  },
  {
    path: "/updateProfile",
    element: (
      <PrivateRoute>
        <UpdateProfilePicture></UpdateProfilePicture>
      </PrivateRoute>
    ),
  },
   {
    path: "/dashboard/add-course",
    element: (
      <PrivateRoute>
        <AddCourse></AddCourse>
      </PrivateRoute>
    ),
  },
]);

export default router;
