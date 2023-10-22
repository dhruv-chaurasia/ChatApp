const express = require("express");
const dotenv = require("dotenv"); //import dotenv
const { chats } = require("./data/data"); // import data.js
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config(); // configure dotenv
connectDB();

const app = express();

app.use(express.json()); // to accept JSON Datao0

// endpoint ..when u enter localhost:5000
app.get("/", (req, res) => {
  res.send("API is running successfully");
});

// // endpoint ..when u enter localhost:5000/api/chat
// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// // endpoint ..when u enter localhost:5000/api/chat/(some id)
// app.get("/api/chat/:id", (req, res) => {
//   //   console.log(req.params.id); // gives the id that is mentioned in the url
//   const singleChat = chats.find((c) => c._id === req.params.id); // finds the chat corresponding to id in chats
//   res.send(singleChat);
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // port number from .env file. If not available then 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.yellow.bold);
});
