import { useEffect } from "react";
import { socket } from "../utils/socket.io";

export const useGetRealTimeMessage = (setChats) => {
  useEffect(() => {
    const handleNewMessage = (message) => {
        console.log("Got message realtime:", message);
      setChats((prev) => [...prev, message]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [setChats]);
};
