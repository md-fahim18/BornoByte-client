import React from "react";
import { FiBell, FiUser } from "react-icons/fi";
import ThemeSwitcher from "../../../shared/ThemeSwitcher";

const UserTopbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full navbar bg-base-100 shadow-md text-base-content z-50">
      
      {/* Centered Title */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-berlin text-2xl md:text-3xl font-bold text-amber-500">
        BornoByte User Panel
      </div>

      {/* Right Icon Buttons */}
      <div className="ml-auto flex gap-4 items-center">
        <span className="scale-50">
          <ThemeSwitcher />
        </span>
        {/* <button className="btn btn-ghost btn-circle hover:text-orange-500 transition">
          <FiBell className="text-xl" />
        </button>
        <button className="btn btn-ghost btn-circle hover:text-orange-500 transition">
          <FiUser className="text-xl" />
        </button> */}
      </div>

    </div>
  );
};

export default UserTopbar;
