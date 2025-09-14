import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useGetChats } from '../hooks/useGetChats'
import { MESSAGE_API_ENDPOINT, USER_API_ENDPOINT } from '../utils/apiEndpoints'

const Chats = () => {
  const { reciverId } = useParams()
  const [chatUser, setChatUser] = useState(null)
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const messagesEndRef = useRef(null)

  const { chats } = useSelector((state) => state.chat)
  const { refetchChats, loading, error } = useGetChats(reciverId)

  // Scroll to bottom whenever chats change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats])

  useEffect(() => {
    refetchChats()
  }, [reciverId])

  const fetchChatUser = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/user/${reciverId}`, {
        withCredentials: true,
      })
      if (res.data.success) {
        setChatUser(res.data.user)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchChatUser()
  }, [reciverId])

  const handleSend = async () => {
    if (!text && !file) return // যদি কিছু না থাকে তাহলে send না হবে

    const formData = new FormData()
    formData.append('text', text)
    if (file) formData.append('file', file)

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
        refetchChats()
      }
    } catch (error) {
      console.log(error)
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
        {chats?.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">Let's start talking!</p>
        ) : (
          chats?.map((chat, index) => (
            <div
              key={index}
              className={`flex mb-2 ${
                chat.senderId === reciverId ? 'justify-start' : 'justify-end'
              }`}
            >
              <div className={`chat ${chat.senderId === reciverId ? 'chat-start' : 'chat-end'}`}>
                {chat.type === 'text' && <div className="chat-bubble">{chat.message}</div>}
                {chat.type === 'image' && (
                  <div className="chat-bubble">
                    <img src={chat.message} alt="chat" className="max-w-xs rounded-lg" />
                  </div>
                )}
              </div>
            </div>
          ))
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
