import React from 'react'
import { Outlet} from 'react-router'
import Navbar from '../components/Navbar'
// import { useSelector } from 'react-redux'

const MainLayout = () => {
 
  
  return (
    <div>
        <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout
