import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FiCamera } from "react-icons/fi";
import { USER_API_ENDPOINT } from "../utils/apiEndpoints";
import { toast } from "react-toastify";
import { setUser } from "../redux/userSlice";

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProfilePhoto(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      if (oldPassword) formData.append("oldPassword", oldPassword);
      if (newPassword) formData.append("newPassword", newPassword);
      if (file) formData.append("profilePicture", file);

      const res = await axios.post(`${USER_API_ENDPOINT}/update-profile`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(res.data.message)
        setOldPassword("");
        setNewPassword("");
        setFile(null);
        dispatch(setUser(res.data.user))
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    toast.error(err.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="bg-white dark:bg-gray-900 h-screen flex justify-center items-center">
         <div className="max-w-3xl mx-auto p-6 shadow-xl bg-white dark:bg-gray-800 rounded-xl border-[#9810fa] border-2 transition-all duration-500">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        My Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md cursor-pointer hover:ring-4 hover:ring-blue-400 transition-all"
              onClick={() => fileInputRef.current.click()}
            />
            <FiCamera size={25} className="absolute bottom-1 right-1 text-white bg-blue-500 rounded-full p-1 cursor-pointer" onClick={() => fileInputRef.current.click()} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
          <div>
            <p className="text-gray-700 dark:text-gray-200">Click on image to change</p>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 transition"
            required
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-200 dark:bg-gray-600 dark:text-gray-200 cursor-not-allowed transition"
          />
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Leave empty if not changing"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min 6 chars, 1 letter, 1 number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
   </div>
  );
};

export default Profile;
