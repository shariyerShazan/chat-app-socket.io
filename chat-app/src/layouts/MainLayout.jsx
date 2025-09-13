import React from 'react'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default MainLayout
