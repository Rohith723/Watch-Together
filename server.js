const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your React app's URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🔥 New user connected:", socket.id);

  // Handle Video Sync
  socket.on("syncVideo", ({ action, time }) => {
    console.log(`📺 Syncing Video: ${action} at ${time}s`);
    socket.broadcast.emit("syncVideo", { action, time }); // Send to others
  });

  // Handle Chat Messages
  socket.on("chatMessage", (message) => {
    console.log("💬 New Chat Message:", message);
    io.emit("chatMessage", message); // Send to all clients
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
