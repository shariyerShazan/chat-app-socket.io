import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:6002"; 

export const socket = io(SOCKET_URL, {
  withCredentials: true,  
  autoConnect: false      
});
