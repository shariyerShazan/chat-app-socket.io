// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.user);

  if (!user?._id) {
    toast.error("Please login first!");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
