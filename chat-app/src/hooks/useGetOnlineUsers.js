import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../utils/socket.io";
import { setOnlineUsers } from "../redux/userSlice";


const OnlineListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("online-users", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socket.off("online-users");
    };
  }, [dispatch]);

  return null;
};

export default OnlineListener;
