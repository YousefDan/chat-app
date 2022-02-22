const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { addUser, getUsersRoom, removeUser } = require("./utils/users");
const formatMessage = require("./utils/formatMessage");
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Runs When The Client Connect
io.on("connection", (socket) => {
  socket.on("join_user", ({ username, room }) => {
    const user = addUser(socket.id, room, username);
    socket.join(user.room);
    // send welcome message to user
    socket.emit(
      "message",
      formatMessage("ChatCord", `Hi ${user.username} welcome to chatroom`)
    );
    // broadcast message
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("ChatCord", `${user.username} joined to chatroom`)
      );
    // listen on message from the client
    socket.on("send_message", (msg) => {
      io.to(user.room).emit("message", formatMessage(user.username, msg));
    });
    // send users and room
    io.to(user.room).emit("user_room", {
      room: user.room,
      users: getUsersRoom(user.room),
    });
    // when a user leave the chat
    socket.on("user_left", () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit(
          "message",
          formatMessage("ChatCord", `${user.username} left the chat`)
        );
        io.to(user.room).emit("user_room", {
          room: user.room,
          users: getUsersRoom(user.room),
        });
      }
    });
    // when a user disconnect
    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit(
          "message",
          formatMessage("ChatCord", `${user.username} left the chat`)
        );
        io.to(user.room).emit("user_room", {
          room: user.room,
          users: getUsersRoom(user.room),
        });
      }
    });
  });
});

// Running The Server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
