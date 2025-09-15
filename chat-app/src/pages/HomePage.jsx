import React, { useState, useEffect, useRef } from "react";
import SideBarHome from "../components/SideBarHome";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { socket } from "../utils/socket.io";
import { HiMenu } from "react-icons/hi";

const HomePage = () => {
  const { user } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    if (user?._id) {
      socket.connect();
      socket.emit("user-joined", user._id);
    }

    return () => {
      socket.disconnect();
    };
  }, [user?._id]);

  // Click outside to close sidebar (small screens)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="flex relative dark:bg-gray-800">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed top-0 right-0 h-full w-64 dark:bg-gray-900 shadow-lg
          transform transition-transform duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0 md:relative md:flex
        `}
      >
        <SideBarHome />
      </div>

      {/* Menu Button (only small screens) */}
      <button
        className="fixed top-22 left-4 z-50 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition md:hidden"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <HiMenu size={24} />
      </button>

      {/* Overlay (small screens) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 ml-0  transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
