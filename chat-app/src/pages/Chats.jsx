import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import { MESSAGE_API_ENDPOINT, USER_API_ENDPOINT } from '../utils/apiEndpoints'

const Chats = () => {
  const { reciverId } = useParams()
  const [chatUser, setChatUser] = useState(null)
  const [chats, setChats] = useState([])
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const messagesEndRef = useRef(null)

  // Scroll to bottom whenever chats change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats])

  // Fetch chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `${MESSAGE_API_ENDPOINT}/get-message/${reciverId}`,
          { withCredentials: true }
        )
        if (res.data.success) {
          setChats(res.data.chats)
        } else {
          setChats([])
        }
      } catch (err) {
        console.log(err)
        setChats([])
      }
    }

    if (reciverId) fetchChats()
  }, [reciverId])

  // Fetch chat user info
  useEffect(() => {
    const fetchChatUser = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/user/${reciverId}`, {
          withCredentials: true,
        })
        if (res.data.success) setChatUser(res.data.user)
      } catch (err) {
        console.log(err)
      }
    }

    if (reciverId) fetchChatUser()
  }, [reciverId])

  // Send message
  const handleSend = async () => {
    if (!text && !file) return

    const formData = new FormData()
    formData.append('text', text)
    if (file) formData.append('image', file)

    try {
      const res = await axios.post(
        `${MESSAGE_API_ENDPOINT}/send-message/${reciverId}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      if (res.data.success) {
        setText('')
        setFile(null)
        setChats(prev => [...prev, res.data.data]) // নতুন মেসেজ যোগ করা
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full mx-auto border rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 bg-gray-100 border-b flex items-center">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={chatUser?.profilePicture || '/default-avatar.png'} alt="User Avatar" />
          </div>
        </div>
        <h1 className="ml-3 font-semibold">{chatUser?.fullName || 'Loading...'}</h1>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        {chats.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">Let's start talking!</p>
        ) : (
          chats.map((chat, index) => {
            const isReceiver = chat.senderId._id === reciverId
            const name = isReceiver ? chat.senderId.fullName : chat.reciverId.fullName
            const avatar = isReceiver ? chat.senderId.profilePicture : chat.reciverId.profilePicture

            return (
              <div
                key={index}
                className={`flex mb-2 ${isReceiver ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`chat ${isReceiver ? 'chat-start' : 'chat-end'}`}>
                  {/* Profile picture + name */}
                  <div className={`flex items-center ${isReceiver ? 'flex-row' : 'flex-row-reverse'}`}>
                    <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                    <span className={`text-sm font-semibold mx-2 ${isReceiver ? 'text-left' : 'text-right'}`}>
                      {name}
                    </span>
                  </div>

                  {/* Message bubble */}
                  {chat.text && (
                    <div className="chat-bubble mt-1">{chat.text}</div>
                  )}
                  {chat.image && (
                    <div className="chat-bubble mt-1">
                      <img src={chat.image} alt="chat" className="max-w-xs rounded-lg" />
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t bg-gray-50 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          className="file-input file-input-bordered"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  )
}

export default Chats
