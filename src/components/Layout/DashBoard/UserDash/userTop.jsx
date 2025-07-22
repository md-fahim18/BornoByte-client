import React from "react";
import { FiBell, FiUser } from "react-icons/fi";
import ThemeSwitcher from "../../../shared/ThemeSwitcher";

const UserTopbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm text-base-content">
      <div className="flex-1 px-4 font-bold text-xl text-amber-500 font-berlin">
        BornoByte
      </div>
      <div className="flex gap-4 items-center px-4">
        <span className="scale-50">
          <ThemeSwitcher />
        </span>
        <FiBell className="text-xl hover:text-amber-500 cursor-pointer" />
        <FiUser className="text-xl hover:text-amber-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default UserTopbar;
