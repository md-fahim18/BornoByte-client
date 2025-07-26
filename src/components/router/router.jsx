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
import TermsOfUse from "../shared/FooterComponents/termsOfUse";
import PrivacyPolicy from "../shared/FooterComponents/PrivacyPolicy";
import CookiePolicy from "../shared/FooterComponents/CookiePolicy";
import PasswordReset from "../Auth/PasswordReset";

import PaymentSuccess from "../Payments/paymentSuccess"; // ✅ updated import
import PaymentFailed from "../Payments/paymentFail";  // ✅ updated import

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
    element: <CourseDetailsMain />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
  {
    path: "inbox",
    element: <Inbox />,
  },
  {
    path: "achievements",
    element: <Achievements />,
  },
  {
    path: "pending-courses",
    element: <PendingCourses />,
  },
  {
    path: "add-course",
    element: <AddCourse />,
  },
  {
    path: "manage-courses",
    element: <ManageCourses />,
  },
  {
    path: "/dashboard/update-course/:id",
    element: <UpdateCourse />,
  },
  {
    path: "enroll-form/:id",
    element: <EnrollForm />,
  },
  {
    path: "terms-of-use",
    element: <TermsOfUse></TermsOfUse>,
  },
  {
    path: "privacy-policy",
    element: <PrivacyPolicy></PrivacyPolicy>,
  },
  {
    path: "cookie-policy",
    element: <CookiePolicy></CookiePolicy>,
  },
  {
  path: "/password-reset",
  element: <PasswordReset />,
  },
  {
  path: "payment-success",
  element: <PaymentSuccess />, // ✅ updated import 
  },
  {
  path: "payment-failed",
  element: <PaymentFailed />, // ✅ updated import  
  },

]);

export default router;
