import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetOtherUsers } from "../hooks/useGetOtherUsers";
import { NavLink } from "react-router"; 

const SideBarHome = () => {
  const { otherUsers } = useSelector((state) => state.user);
  const { loading, error, refetchOtherUsers } = useGetOtherUsers();

  useEffect(() => {
    refetchOtherUsers();
  }, [refetchOtherUsers]);

  return (
    <div className="w-72 h-screen border-r dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Chats
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading && (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        {!loading && !error && otherUsers?.length === 0 && (
          <p className="text-gray-500 text-center">No users found.</p>
        )}

        {!loading &&
          !error &&
          otherUsers?.map((user) => (
            <NavLink
              to={`/chats/${user?._id}`}
              key={user?._id}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3    cursor-pointer transition ${
                  isActive
                    ? "border-l-[#9810fa] bg-[#ecd3fe] border-l-4 "
                    : "hover:bg-[#ecd3fe] hover:border-l-[#ecd3fe] border-l-4 border-l-white dark:hover:bg-gray-800"
                }`
              }
            >
              {/* Profile Picture with Active Indicator */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
                  <img
                    src={user?.profilePicture || "/default-avatar.png"}
                    alt={user?.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {user?.isActive && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                )}
              </div>

              <p className="font-medium">{user?.fullName}</p>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default SideBarHome;
