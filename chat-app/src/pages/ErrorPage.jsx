import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4">
      {/* Error Code */}
      <h1 className="text-[8rem] font-extrabold drop-shadow-lg">404</h1>

      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-bold mt-4 drop-shadow-md">
        Oops! Page not found
      </h2>

      {/* Description */}
      <p className="mt-4 text-lg md:text-xl text-center max-w-md drop-shadow-sm">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        Go Back Home
      </Link>

      {/* Optional Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-80 h-80 bg-white opacity-10 rounded-full -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-60 h-60 bg-white opacity-10 rounded-full -bottom-20 -right-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ErrorPage;
