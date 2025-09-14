import React from 'react'
import SideBarHome from '../components/SideBarHome'
import { Outlet } from 'react-router'

const HomePage = () => {
  return (
    <div className='flex dark:bg-gray-800'>
      <SideBarHome />
        <Outlet />
    </div>
  )
}

export default HomePage
