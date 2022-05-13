const express = require("express");
const PORT = process.env.PORT || 8082;
const connectDB = require("./db");
const getUsers = require("./db");
const cors = require("cors");

const server = express();

connectDB().then((r) => console.log("connected to DB"));

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  console.log("API is running");
  res.send("API is running!");
});

server.post("/login", (req, res) => {
  //   getUsers().then((res) => console.log(res));
  res.send("Logged User In");
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
