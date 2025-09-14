import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MESSAGE_API_ENDPOINT } from "../utils/apiEndpoints";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useGetChats } from "../hooks/useGetChats";

const Chats = () => {
  const { reciverId } = useParams();
  const {chats} = useSelector((state)=>state.chat)
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);


  const chatEndRef = useRef(null);

  // scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const {refetchChats, loading, error} = useGetChats()

 

  const handleSend = async () => {
    if (!text && !image) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("text", text);
      if (image) formData.append("file", image);

      const res = await axios.post(`${MESSAGE_API_ENDPOINT}/send-message/${reciverId}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setMessages((prev) => [...prev, res.data.data]);
        setText("");
        setImage(null);
        scrollToBottom();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      {userToChat && (
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-300">
              <img src={userToChat.profilePicture || "/default-avatar.png"} alt={userToChat.fullName} className="w-full h-full object-cover" />
              {userToChat.isActive && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>}
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{userToChat.fullName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{userToChat.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chats.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.senderId === userToChat?._id ? "justify-start" : "justify-end"}`}
          >
            <div className={`p-3 rounded-lg max-w-xs ${msg.senderId === userToChat?._id ? "bg-white dark:bg-gray-800" : "bg-purple-500 text-white"}`}>
              {msg.text && <p>{msg.text}</p>}
              {msg.image && <img src={msg.image} alt="sent" className="mt-2 rounded-lg" />}
              <p className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Send Message */}
      <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 input input-bordered"
        />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="file-input file-input-bordered" />
        <button
          onClick={handleSend}
          disabled={!text && !image || loading}
          className={`btn btn-primary ${!text && !image ? "btn-disabled" : ""}`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chats;
