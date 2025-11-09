
// app.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", require("./routes/authRoute"));
// (other API routes like /api/boards if you have them)

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // join a board room
  socket.on("joinBoard", (boardId) => {
    socket.join(boardId);
    console.log(`Socket ${socket.id} joined board ${boardId}`);
    // notify others (optional)
    socket.to(boardId).emit("user-joined", { id: socket.id });
  });

  // Scoped drawing: broadcast to everyone in the same room except sender
  socket.on("draw", ({ boardId, x, y, color }) => {
    if (!boardId) return;
    socket.to(boardId).emit("onDraw", { x, y, color });
  });

  socket.on("drawText", (data) => {
  socket.to(data.boardId).emit("drawText", data);
});

  // Scoped clear
  socket.on("clear", (boardId) => {
    if (!boardId) return;
    io.to(boardId).emit("onClear");
  });

  // Chat message in room
  socket.on("chat", ({ boardId, user, message }) => {
    if (!boardId) return;
    const payload = {
      from: socket.id,
      user: user || "Guest",
      message,
      time: Date.now()
    };
    io.to(boardId).emit("chatMessage", payload);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
    // Optionally broadcast disconnect to all rooms
    // const rooms = Array.from(socket.rooms).filter(r => r !== socket.id);
    // rooms.forEach(roomId => socket.to(roomId).emit('user-left', { id: socket.id }));
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
