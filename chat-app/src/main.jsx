import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { Routes } from './routes/Routes'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Routes} />
    <ToastContainer />
  </StrictMode>,
)
