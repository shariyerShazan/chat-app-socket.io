import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/apiEndpoints";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Login = () => {
    const dispatch = useDispatch()
    const [btnLoading , setBtnLoading] = useState(false)
    const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    setBtnLoading(true)
    const formData = {
        email,
        password,
      };

    e.preventDefault();
    try {
        const res = await axios.post(`${USER_API_ENDPOINT}/login` , formData , {withCredentials : true})
        if(res.data.success){
            setBtnLoading(false)
            toast.success(res.data.message)
            dispatch(setUser(res.data.user))
            navigate("/")
            e.target.reset()
        }
    } catch (error) {
        setBtnLoading(false)
        console.log(error)
        toast.error(error.response.data.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 w-full max-w-md border-4 border-gradient-to-r from-green-400 via-blue-500 to-purple-500"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-green-600 dark:text-blue-400">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative w-full">
            <fieldset className="border border-gray-300 dark:border-gray-600 rounded-md focus-within:border-green-500 transition-colors duration-200">
              <legend
                className={`px-1 text-gray-400 dark:text-gray-300 font-bold text-lg transition-all duration-200
                  ${email ? "text-xs font-normal text-green-600 dark:text-blue-400" : "text-sm text-gray-400 dark:text-gray-300"} `}
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
            <fieldset className="border border-gray-300 dark:border-gray-600 rounded-md focus-within:border-green-500 transition-colors duration-200">
              <legend
                className={`px-1 text-gray-400 dark:text-gray-300 text-lg font-bold transition-all duration-200
                  ${password ? "text-xs font-normal text-green-600 dark:text-blue-400" : "text-sm text-gray-400 dark:text-gray-300"} `}
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
            disabled={btnLoading}
            className={`btn btn-primary w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 ${
              btnLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {btnLoading ? "Logining..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-300">
          Don't have an account?{" "}
          <Link  to="/register" className="text-green-600 dark:text-blue-400 font-bold">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
