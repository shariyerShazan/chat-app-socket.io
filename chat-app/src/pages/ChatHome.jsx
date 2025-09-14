import React from "react";
import { AiFillMessage } from "react-icons/ai";


const ChatHome = () => {
  return (
    <div className="flex flex-col w-full h-[60vh]  items-center justify-center  text-center p-6">
      {/* Icon */}
      <div className="bg-blue-500 text-white p-4 rounded-full shadow-md mb-4">
        <AiFillMessage size={40} />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Welcome to Chat App
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
        Start a conversation by selecting a user from the sidebar.  
        Your messages will appear here.
      </p>
    </div>
  );
};

export default ChatHome;
