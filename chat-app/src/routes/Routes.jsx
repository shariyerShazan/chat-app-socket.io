import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Chats from "../pages/chats";
import ChatHome from "../pages/ChatHome";
import PrivateRoute from "./PrivateRoute";

export const Routes = createBrowserRouter([
    {
        path : "/" ,
        element : <MainLayout /> ,
        errorElement :  <ErrorPage /> ,
        children : [
            {
                path: "/" ,
                 element: 
              
                        <HomePage />
      
                 ,
                 children: [
                    {
                        path : "/" ,
                        element:
                        <PrivateRoute>
                         <ChatHome />
                         </PrivateRoute>
                    },
                    {
                        path : "chats/:reciverId" ,
                        element: 
                        <PrivateRoute>
                               <Chats />
                         </PrivateRoute>
                  
                    }
                 ]
            },
            {
                path : "login" ,
                element : <Login />
            } ,
            {
                path : "register" ,
                element: <Register />
            },
            {
                path: "profile" ,
                element:
                <PrivateRoute>
                      <Profile />
         </PrivateRoute> 
            }
        ]
    }
])