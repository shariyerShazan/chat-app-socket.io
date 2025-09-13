import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const Routes = createBrowserRouter([
    {
        path : "/" ,
        element : <MainLayout /> ,
        errorElement :  <ErrorPage /> ,
        children : [
            {
                index: true ,
                 element: <HomePage />
            },
            {
                path : "login" ,
                element : <Login />
            } ,
            {
                path : "register" ,
                element: <Register />
            }
        ]
    }
])