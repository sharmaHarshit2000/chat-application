const express = require("express");
const cors = require("cors");
const chats = require("./data/data.js");
const connectDB = require("./config/db.js");

const notFound = require("./middlewares/notFound.js");
const errorHandler = require("./middlewares/errorHandler.js");

const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  return res.send("Hello form Server");
});
app.get("/api/chat", (req, res) => {
  return res.send(chats);
});
app.get("/api/chat/:id", (req, res) => {
  const { id } = req.params;
  const chat = chats.find((chat) => chat._id == id);
  return res.send(chat);
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}.`));
