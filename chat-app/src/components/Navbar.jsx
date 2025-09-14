import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { USER_API_ENDPOINT } from "../utils/apiEndpoints";
import { toast } from "react-toastify";
import { setUser } from "../redux/userSlice";

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.user)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleThemeChange = () => setDarkMode(!darkMode);

  const handleLogout = async ()=>{
    try {
        const res = await axios.post(`${USER_API_ENDPOINT}/logout` , {} , {withCredentials: true})
        if(res.data.success){
            toast.success(res.data.message)
            dispatch(setUser(null))
            navigate("/login")
        }
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    }
  }
  return (
    <nav className="bg-white dark:bg-gray-950   shadow-lg px-6 py-3 flex justify-between items-center">
      {/* Left: Website Name */}
      <div className="text-2xl font-bold text-purple-600  dark:text-pink-400">
        Chatty
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 relative">
        {/* Dark/Light Mode Toggle */}
        <label className="swap swap-rotate cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleThemeChange}
          />
          {/* Sun icon */}
          <svg
            className="swap-off h-8 w-8 fill-current text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* Moon icon */}
          <svg
            className="swap-on h-8 w-8 fill-current text-gray-800 dark:text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        {/* Profile Picture */}
        {
            user?   <div className="relative">
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-purple-500 dark:border-pink-400"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-2 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  View Profile
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </div>
            )}
          </div>:
          <Link to={"/login"} className="btn py-1 px-4">
            Login
             </Link>
        }
      
      </div>
    </nav>
  );
};

export default Navbar;
