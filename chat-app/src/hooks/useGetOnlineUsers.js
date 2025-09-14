import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../redux/userSlice";
import { socket } from "../utils/socket.io";

const OnlineListener = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?._id) return;
  
    socket.emit("user-joined", user._id);
  
    socket.on("online-users", (users) => {
      dispatch(setOnlineUsers(users));
    });
  
    return () => {
      socket.off("online-users");
    };
  }, [user?._id, dispatch]);

  return null;
};

export default OnlineListener;
