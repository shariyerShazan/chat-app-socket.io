import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import { MESSAGE_API_ENDPOINT, USER_API_ENDPOINT } from '../utils/apiEndpoints'
import ChatSkeleton from '../components/ChatSkeleton'


const Chats = () => {
  const { reciverId } = useParams()
  const [chatUser, setChatUser] = useState(null)
  const [chats, setChats] = useState([])
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll to bottom whenever chats change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats])

  // Fetch chats
  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `${MESSAGE_API_ENDPOINT}/get-message/${reciverId}`,
          { withCredentials: true }
        )
        if (res.data.success) setChats(res.data.chats)
        else setChats([])
      } catch (err) {
        console.log(err)
        setChats([])
      } finally {
        setLoading(false)
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
        setChats(prev => [...prev, res.data.data])
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
      <div className="flex-1 p-4 overflow-y-auto bg-white space-y-2">
        {loading ? (
          <ChatSkeleton />
        ) : chats.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">Let's start talking!</p>
        ) : (
          chats.map((chat, index) => {
            const isReceiver = chat.senderId._id === reciverId
            const name = isReceiver ? chat.senderId.fullName : chat.reciverId.fullName
            const avatar = isReceiver ? chat.senderId.profilePicture : chat.reciverId.profilePicture

            return (
              <div
                key={index}
                className={`flex ${isReceiver ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`chat p-2 rounded-xl max-w-xs ${isReceiver ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
                  <div className={`flex items-center ${isReceiver ? 'flex-row' : 'flex-row-reverse'} mb-1`}>
                    <img src={avatar} alt="avatar" className="w-6 h-6 rounded-full" />
                    <span className="text-sm font-semibold mx-2">{name}</span>
                  </div>

                  {chat.text && <div className="">{chat.text}</div>}
                  {chat.image && (
                    <div className="mt-2">
                      <img src={chat.image} alt="chat" className="max-w-full rounded-lg" />
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
        {file && (
          <div className="relative">
            <img src={URL.createObjectURL(file)} alt="preview" className="w-20 h-20 object-cover rounded-md" />
            <button
              onClick={() => setFile(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              x
            </button>
          </div>
        )}
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1 focus:ring-0"
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
