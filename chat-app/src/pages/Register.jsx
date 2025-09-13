import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 w-full max-w-md border-4 border-gradient-to-r from-purple-400 via-pink-500 to-red-400"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-600 dark:text-pink-400">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="relative w-full">
            <fieldset className="border border-gray-300 dark:border-gray-600 rounded-md focus-within:border-purple-500 transition-colors duration-200">
              <legend
                className={`px-1 text-gray-400 dark:text-gray-300 text-lg font-bold transition-all duration-200
                  ${fullName ? "text-xs font-normal text-purple-600 dark:text-pink-400" : "text-sm text-gray-400 dark:text-gray-300"} `}
              >
                Full Name
              </legend>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-2 pt-4 pb-2 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                required
              />
            </fieldset>
          </div>

          {/* Email */}
          <div className="relative w-full">
            <fieldset className="border border-gray-300 dark:border-gray-600 rounded-md focus-within:border-purple-500 transition-colors duration-200">
              <legend
                className={`px-1 text-gray-400 dark:text-gray-300 text-lg font-bold transition-all duration-200
                  ${email ? "text-xs font-normal text-purple-600 dark:text-pink-400" : "text-sm text-gray-400 dark:text-gray-300"} `}
              >
                Email
              </legend>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 pt-4 pb-2 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                required
              />
            </fieldset>
          </div>

          {/* Password */}
          <div className="relative w-full">
            <fieldset className="border border-gray-300 dark:border-gray-600 rounded-md focus-within:border-purple-500 transition-colors duration-200">
              <legend
                className={`px-1 text-gray-400 dark:text-gray-300 text-lg font-bold transition-all duration-200
                  ${password ? "text-xs font-normal text-purple-600 dark:text-pink-400" : "text-sm text-gray-400 dark:text-gray-300"} `}
              >
                Password
              </legend>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 pt-4 pb-2 pr-10 bg-transparent outline-none text-gray-900 dark:text-gray-100"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-400 dark:text-gray-300 z-10"
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </fieldset>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 dark:text-pink-400 font-bold">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
