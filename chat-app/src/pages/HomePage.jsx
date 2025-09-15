import React, { useEffect } from 'react'
import SideBarHome from '../components/SideBarHome'
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux';
import { socket } from '../utils/socket.io';

const HomePage = () => {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?._id) {
      socket.connect();            
      socket.emit("user-joined", user._id); 
    }

    return () => {
      socket.disconnect();      
    };
  }, [user?._id]);

  return (
    <div className='flex dark:bg-gray-800'>
      <SideBarHome />
        <Outlet />
    </div>
  )
}

export default HomePage
