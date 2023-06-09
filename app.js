import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { config } from "./src/config/index.js";
import logger from "morgan";
import { globalErrorHandler } from "./src/utils/globalErrHandler.js";
import loanRouter from "./src/router/loan.route.js";
import router from "./src/router/admin.route.js";
import { router as resetPasswordRouter } from "./src/router/passwordReset.route.js";
import { router as contactRouter } from "./src/router/contact.route.js";
import { router as chatRouter } from "./src/router/chatRoute.js";
import { router as messageRoute } from "./src/router/messageRoute.js";
import { Server } from "socket.io";
// configuring environment variables

dotenv.config();

const app = express();

// passportConfig(passport)
// Local database connection
mongoose
  .connect(config.database_url)
  .then(() => console.log("Database connected successfully".yellow.bold)) // logging "Database connected successfully" to the console
  .catch((err) => {
    console.log(err.message);
  });

// Configuring the port
const port = config.port || 5000;

// In-built Middleware to gain access to the body
app.use(express.json());

app.use(logger("tiny"));
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Welcome to NoDebt App");
});

// defining the routes
app.use("/api/admins", router);
app.use("/api/loans", loanRouter);

app.use("/api/password-reset", resetPasswordRouter);

app.use("/api", contactRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRoute);

// Handling errors sent to the response body
app.use(globalErrorHandler);
//Starting new socket.io server

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}`.bold.green)
); // logging "Listening on port 4000" to the console.

// const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  // SETUP
  socket.on("setup", (adminData, callback) => {
    socket.join(adminData._id);
    console.log(`Admin has joined personal room ${adminData._id}`);
    socket.emit("connected");
  });

  //JOIN CHAT
  socket.on("join chat", (room, callback) => {
    socket.join(room);
    console.log("Admin Joined Room: " + room);
  });
  // TYPING
  socket.on("typing", (room) => {
    socket.to(room).emit("typing", { message: "User is typing" });
    console.log("typing");
  });
  // STOP TYPING
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing", { message: "User has stopped typing" });
  });
  //NEW MESSAGE
  socket.on("new message", (newMessageReceived, callback) => {
    let chat = newMessageReceived.chat;

    if (!chat.admins) {
      console.log("chat.admins not defined");
      return;
    }

    chat.admins.forEach((admin) => {
      if (admin._id === newMessageReceived.sender._id) return;

      socket.in(admin._id).emit("message received", newMessageReceived, () => {
        console.log("Message sent to recipient");
      });
    });
  });

  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

  io.engine.on("connection_error", (err) => {
    console.log(err.req);
    console.log(err.code);
    console.log(err.message);
    console.log(err.context);
  });
});
