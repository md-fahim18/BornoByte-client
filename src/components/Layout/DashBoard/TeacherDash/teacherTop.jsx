// src/components/Layout/DashBoard/TeacherDash/TeacherTopbar.jsx
import React from "react";
import { FiBell, FiUser } from "react-icons/fi";
import ThemeSwitcher from "../../../shared/ThemeSwitcher";

const TeacherTopbar = () => {
  return (
    <div className="navbar fixed top-0 left-0 right-0 h-16 bg-base-100 shadow-md z-50 text-base-content px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-orange-500 font-berlin">BornoByte Teacher Panel</h1>
      {/* <div className="flex items-center gap-4">
        <span className="scale-50">
          <ThemeSwitcher />
        </span>
        {/* <FiBell className="text-xl hover:text-orange-500 cursor-pointer" />
        <FiUser className="text-xl hover:text-orange-500 cursor-pointer" /> */}
      {/* </div> */}
    </div>
  );
};

export default TeacherTopbar;
