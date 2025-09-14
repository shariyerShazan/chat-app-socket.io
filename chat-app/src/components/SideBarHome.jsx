import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetOtherUsers } from "../hooks/useGetOtherUsers";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

const SideBarHome = () => {
  const { otherUsers, onlineUsers } = useSelector((state) => state.user);
  const { loading, error, refetchOtherUsers } = useGetOtherUsers();

  useEffect(() => {
    refetchOtherUsers();
  }, [refetchOtherUsers]);

  const skeletonArray = Array(5).fill(0);

  return (
    <div className="w-72 h-[93vh] shadow-xl bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="py-6.5 shadow-sm dark:border-gray-700 flex items-center justify-center">
        <h2 className="text-xl text-center font-bold text-gray-800 dark:text-gray-200">
          Chats
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading &&
          skeletonArray.map((_, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg animate-pulse bg-gray-100 dark:bg-gray-800"
            >
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        {!loading && !error && otherUsers?.length === 0 && (
          <p className="text-gray-500 text-center">No users found.</p>
        )}

        {!loading &&
          !error &&
          otherUsers?.map((user) => {
            const isOnline = onlineUsers?.includes(user?._id); 

            return (
              <NavLink
                to={`/chats/${user._id}`}
                key={user._id}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 p-3 cursor-pointer dark:text-white transition-all ${
                    isActive
                      ? "bg-[#ecd3fe] border-l-4 border-l-[#9810fa] dark:bg-[#ecd3fe] dark:!text-black"
                      : "hover:bg-[#f4eaff] dark:hover:bg-gray-800 border-l-4 border-l-white"
                  }`
                }
              >
                {/* Profile Picture with Active Indicator */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.01 }}
                  className="relative"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                    <img
                      src={user?.profilePicture || "/default-avatar.png"}
                      alt={user?.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                  )}
                </motion.div>

                {/* Name */}
                <p className="font-medium">{user?.fullName}</p>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default SideBarHome;
