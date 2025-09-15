import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);



// Map to store online users: userId -> [socketIds]
const onlineUsers = new Map();


// getReciverSocketId function
export const getReciverSocketId = (reciverId)=>{
  return onlineUsers.get(reciverId);
}


const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log("A user connected:", socket.id);

  socket.on("user-joined", (userId) => {
    if (onlineUsers.has(userId)) {
      const sockets = onlineUsers.get(userId);
      if (!sockets.includes(socket.id)) {
        sockets.push(socket.id);
        onlineUsers.set(userId, sockets);
      }
    } else {
      onlineUsers.set(userId, [socket.id]);
    }
  
    // console.log("Online users:", Array.from(onlineUsers.entries()));
    io.emit("online-users", Array.from(onlineUsers.keys()));
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected:", socket.id);

    for (let [userId, sockets] of onlineUsers.entries()) {
      const updatedSockets = sockets.filter((id) => id !== socket.id);

      if (updatedSockets.length > 0) {
        onlineUsers.set(userId, updatedSockets);
      } else {
        onlineUsers.delete(userId);
      }
    }

    // console.log("Updated online users:", Array.from(onlineUsers.entries()));
    io.emit("online-users", Array.from(onlineUsers.keys()));
  });
});

export { io, app, server };
