import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Chats from "../pages/chats";
import ChatHome from "../pages/ChatHome";

export const Routes = createBrowserRouter([
    {
        path : "/" ,
        element : <MainLayout /> ,
        errorElement :  <ErrorPage /> ,
        children : [
            {
                path: "/" ,
                 element: <HomePage />,
                 children: [
                    {
                        path : "/" ,
                        element: <ChatHome />
                    },
                    {
                        path : "chats/:reciverId" ,
                        element: <Chats />
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
                element: <Profile />
            }
        ]
    }
])