import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Auth/AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";
import useAdmin from "../RoleHooks/useAdmin";
import useTeacher from "../RoleHooks/useTeacher";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("access-token");
      fetch(`https://bornobyte.vercel.app/notifications?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch notifications");
          return res.json();
        })
        .then(data => setNotifications(data))
        .catch(err => console.error("Failed to load notifications", err));
    } else {
      setNotifications([]); // clear notifications on logout
    }
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark a notification as read
  const markAsRead = async (id) => {
    if (!id) return;
    const token = localStorage.getItem("access-token");
    try {
      await fetch(`https://bornobyte.vercel.app/notifications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // Update local state to mark as read
      setNotifications(prev =>
        prev.map(n => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch(error => {
        console.error("Sign-out error:", error);
      });
  };

  const links = (
    <>
      <li><Link to="/" className="mx-2 font-semibold text-base text-important-text dark:text-important-text-dark">Home</Link></li>
      <li><Link to="/courses" className="mx-2 font-semibold text-base text-important-text dark:text-important-text-dark">Courses</Link></li>
      <li><Link to="/about" className="mx-2 font-semibold text-base text-important-text dark:text-important-text-dark">About us</Link></li>
      <li><Link to="/contactUs" className="mx-2 font-semibold text-base text-important-text dark:text-important-text-dark">Contact Us</Link></li>
      {user && <li><Link to="/dashboard" className="mx-2 font-semibold text-base text-important-text dark:text-important-text-dark">Dashboard</Link></li>}
      {/* <li><ThemeSwitcher className="text-important-text dark:text-important-text-dark" /></li> */}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-base-content">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>

        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <img src="https://i.imgur.com/UyHx6HZ.png" alt="BornoByte Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
          <span className="text-2xl sm:text-3xl font-berlin text-important-text dark:text-important-text-dark">BornoByte</span>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-2">
        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle relative text-base-content ">
              <FaBell className="text-xl" />
              {unreadCount > 0 && (
                <span className="badge badge-sm bg-red-500 text-white absolute -top-1 -right-1">
                  {unreadCount}
                </span>
              )}
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] shadow bg-base-100 rounded-box w-80 max-h-96 overflow-auto">
              <li className="font-semibold px-3 py-2 text-important-text dark:text-important-text-dark">Notifications</li>
              {notifications.length === 0 ? (
                <li className="text-center text-sm p-2 text-base-content">No notifications</li>
              ) : (
                notifications.map((notification, idx) => (
                  <li
                    key={notification._id || idx}
                    className={notification.read ? "text-sm px-2 py-1 text-base-content" : "text-sm px-2 py-1 font-bold text-important-text dark:text-important-text-dark"}
                  >
                    <Link
                      to={notification.link || "#"}
                      onClick={() => markAsRead(notification._id)}
                      className="block"
                      title={new Date(notification.timestamp).toLocaleString()}
                    >
                      {notification.message}
                      <br />
                      <small className="text-base-content">{new Date(notification.timestamp).toLocaleString()}</small>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar text-base-content">
              <div className="w-10 h-10 rounded-full overflow-hidden border">
                <img
                  alt="User Profile"
                  src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li className="text-sm font-bold text-important-text dark:text-important-text-dark">{user.displayName || user.email}</li>
              {isAdmin && <li><Link to="/dashboard" className="text-base-content">Settings</Link></li>}
              {isTeacher && (
                <>
                  <li><Link to="/dashboard" className="text-base-content">Inbox</Link></li>
                  <li><Link to="/dashboard" className="text-base-content">Settings</Link></li>
                </>
              )}
              {!isAdmin && !isTeacher && (
                <>
                  <li><Link to="/dashboard" className="text-base-content">Inbox</Link></li>
                  <li><Link to="/dashboard" className="text-base-content">Settings</Link></li>
                  <li><Link to="/dashboard" className="text-base-content">Achievement</Link></li>
                </>
              )}
              <li><button onClick={handleLogOut} className="text-base-content">Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;