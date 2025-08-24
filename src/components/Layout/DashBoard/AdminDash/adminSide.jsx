// src/components/Layout/DashBoard/AdminDash/AdminSidebar.jsx
import React from "react";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import { MdOutlinePendingActions, MdLibraryAdd, MdManageAccounts, MdHowToReg, MdDashboardCustomize } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";



const AdminSidebar = ({ setAdminTab }) => {

   const [pendingCount, setPendingCount] = useState(0);
   const [pendingCoursesCount, setPendingCoursesCount] = useState(0);


  useEffect(() => {
      const fetchPendingCount = async () => {
        try {
          const res = await axios.get("http://localhost:3000/enrollRequests/pending-count", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          });
          setPendingCount(res.data.count);
        } catch (err) {
          console.error("Error fetching pending requests count:", err);
        }
      };

      fetchPendingCount(); // initial call

      const interval = setInterval(fetchPendingCount, 10000); // every 10s
      return () => clearInterval(interval); // cleanup on unmount
    }, []);

    useEffect(() => {
      const fetchCounts = async () => {
        try {
          // Pending enrollment requests
          const enrollRes = await axios.get("http://localhost:3000/enrollRequests/pending-count", {
            headers: { Authorization: `Bearer ${localStorage.getItem("access-token")}` },
          });
          setPendingCount(enrollRes.data.count);

          // Pending courses
          const courseRes = await axios.get("http://localhost:3000/videos/pending-count", {
            headers: { Authorization: `Bearer ${localStorage.getItem("access-token")}` },
          });
          setPendingCoursesCount(courseRes.data.count);

        } catch (err) {
          console.error("Error fetching counts:", err);
        }
      };

      fetchCounts();
      const interval = setInterval(fetchCounts, 10000); // refresh every 10s
      return () => clearInterval(interval);
    }, []);



  return (
    <div className="bg-base-200 text-base-content shadow-lg w-72 fixed left-0 top-16 h-[calc(100vh-4rem)] p-4 overflow-y-auto z-40 border-r border-base-300">
      {/* Sidebar Title */}
      <h2 className="text-2xl font-bold mb-8 text-important-text dark:text-important-text-dark text-center mt-4">
        Admin Panel
      </h2>

      {/* Sidebar Menu */}
      <ul className="space-y-4 text-[17px] font-medium">
        <li>
          <a
            href="/"
            className="flex items-center gap-3 w-full text-left hover:text-primary dark:hover:text-primary transition"
          >
            <FiHome className="text-lg" /> Home
          </a>
        </li>


        <li>
          <button
            onClick={() => setAdminTab("users")}
            className="flex items-center gap-3 w-full text-left hover:text-primary dark:hover:text-primary transition"
          >
            <FiUsers className="text-lg" /> All Users
          </button>
        </li>

        <li>
            <button
              onClick={() => setAdminTab("pending")}
              className="flex items-center gap-3 w-full text-left hover:text-primary dark:hover:text-primary transition relative"
            >
              <MdOutlinePendingActions className="text-xl" /> Approval Requests
              {pendingCoursesCount >= 0 && (
                <span className="ml-auto bg-teal-500 text-white px-2 py-0.5 text-sm font-bold rounded-full">
                  {pendingCoursesCount}
                </span>
              )}
            </button>
        </li>

        <li>
          <button
            onClick={() => setAdminTab("add-course")}
            className="flex items-center gap-3 w-full text-left hover:text-primary dark:hover:text-primary transition"
          >
            <MdLibraryAdd className="text-xl" /> Add Course
          </button>
        </li>

        <li>
          <button
            onClick={() => setAdminTab("manage")}
            className="flex items-center gap-3 w-full text-left hover:text-primary dark:hover:text-primary transition"
          >
            <MdManageAccounts className="text-xl" /> Manage Courses
          </button>
        </li>

        <li>
          <button
            onClick={() => setAdminTab("settings")}
            className="flex items-center gap-3 w-full text-left hover:text-primary dark:hover:text-primary transition"
          >
            <FiSettings className="text-lg" /> Settings
          </button>
        </li>
          <li>
          <button
            onClick={() => setAdminTab("enrollReq")}
            className="flex items-center gap-3 w-full text-left hover:text-primary dark:hover:text-primary transition relative"
          >
            <MdHowToReg className="text-xl" /> Enrollment Requests
            {pendingCount > 0 && (
              <span className="ml-auto bg-rose-500 text-white text-sm px-2 py-0.5 font-bold rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        </li> 
          <li>
          <button
            onClick={() => setAdminTab("homepage-Courses")}
            className="flex items-center gap-3 w-full text-left hover:text-primary dark:hover:text-primary transition"
          >
            <MdDashboardCustomize className="text-xl" /> HomePage Courses Form
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
