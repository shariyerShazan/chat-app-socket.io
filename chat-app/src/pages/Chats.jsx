import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { MESSAGE_API_ENDPOINT, USER_API_ENDPOINT } from "../utils/apiEndpoints";
import ChatSkeleton from "../components/ChatSkeleton";
import { RxCross2 } from "react-icons/rx";
import { useGetRealTimeMessage } from "../hooks/useGetRealTimeMessage";

const Chats = () => {
  const { reciverId } = useParams();
  const { user } = useSelector((state) => state.user);
  const [chatUser, setChatUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useGetRealTimeMessage(setChats)
  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  // Fetch chat user
  useEffect(() => {
    if (!reciverId) return;
    const fetchChatUser = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/user/${reciverId}`, {
          withCredentials: true,
        });
        if (res.data.success) setChatUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChatUser();
  }, [reciverId]);

  // Fetch chats
  useEffect(() => {
    if (!reciverId) return;
    const fetchChats = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${MESSAGE_API_ENDPOINT}/get-message/${reciverId}`,
          { withCredentials: true }
        );
        if (res.data.success) setChats(res.data.chats);
        else setChats([]);
      } catch (err) {
        console.log(err);
        setChats([]);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, [reciverId]);

  // Send message
  const handleSend = async () => {
    if (!text && !file) return;
    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("image", file);

    try {
      const res = await axios.post(
        `${MESSAGE_API_ENDPOINT}/send-message/${reciverId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data.success) {
        setText("");
        setFile(null);
        setChats((prev) => [...prev, res.data.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col h-[93vh] w-full mx-auto shadow-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="p-4 flex items-center shadow-sm bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="relative group">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-400 transition-all">
            <img
              src={chatUser?.profilePicture || "/default-avatar.png"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
            {/* <p>{chatUser?.fullName}</p> */}
          </div>
          {chatUser && (
            <span className="absolute bottom-1/5  translate-x-12 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {chatUser?.fullName}
            </span>
          )}
        </div>
        <h1 className="ml-4 text-xl font-semibold opacity-0">
          {/* Hide fullName by default */}
          {chatUser?.fullName}
        </h1>
      </div>

      {/* Chat messages */}
      <div className="flex-1  p-4 overflow-y-auto space-y-3">
        {loading ? (
          <ChatSkeleton />
        ) : chats.length === 0 ? (
          <p className="text-center text-gray-400 mt-10 italic">Let's start talking!</p>
        ) : (
          <AnimatePresence initial={false}>
            {chats.map((chat, index) => {
              const isSender = chat.senderId._id === user._id;
              const avatar = isSender
                ? chat.senderId.profilePicture
                : chat.reciverId.profilePicture;

              return (
                <motion.div
                  key={chat._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`relative max-w-xs p-3 rounded-xl shadow-md transition transform hover:scale-105 flex items-center gap-3 ${
                      isSender
                        ? "bg-blue-500 text-white flex-row-reverse gap-3 "
                        : "bg-gray-200 dark:bg-gray-700 dark:text-white text-black"
                    }`}
                  >
                    {/* Profile picture */}
                    <div className={`relative group flex-shrink-0 mr-2`}>
                      <img
                        src={avatar}
                        alt="avatar"
                        className="w-8 h-8 object-cover rounded-full border-2 border-gray-300 group-hover:border-blue-400 transition-all"
                      />
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {chat.senderId.fullName}
                      </span>
                     
                    </div>
                    

                    {/* Message content */}
                    <div className="text-lg break-words group relative p-1">
  {/* Message text */}
  {chat.text && (
    <div className={`${isSender ? "text-white" : "text-gray-900 dark:text-gray-100"}`}>
      {chat.text}
    </div>
  )}

  {/* Message image */}
  {chat.image && (
    <div className="mt-2">
      <img
        src={chat.image}
        alt="chat"
        className="max-w-full rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      />
    </div>
  )}

  {/* Timestamp: always safe visible on bottom-right corner */}
  <span
    className={`
      absolute top-1/2  text-xs px-1 py-[1px] rounded 
      ${isSender 
        ? "bg-gray-950 text-white dark:bg-white dark:text-black -left-14" 
        : "bg-gray-950 text-white dark:bg-white dark:text-black -right-14"}
      opacity-0 group-hover:opacity-100 transition-opacity duration-200
    `}
  >
    {new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  </span>
</div>


                    
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
        {file && (
          <div className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-20 h-20 object-cover rounded-md border-2 border-gray-300"
            />
            <button
              onClick={() => setFile(null)}
              className="absolute -top-2 -right-2 cursor-pointer bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
            >
              <RxCross2 />
            </button>
          </div>
        )}
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1 focus:ring-0 focus:outline-none border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={text}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="file-input w-32 md:w-fit file-input-bordered"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn btn-primary px-4 py-2" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chats;
