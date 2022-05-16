const express = require("express");
const PORT = process.env.PORT || 8082;
const connectDB = require("./db");
const getUsers = require("./db");
const cors = require("cors");

const server = express();

//const dbConnect = dbo.getDb();
require("dotenv").config();
const connectionString = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(connectionString).then(client => {
  console.log("Connected to database")
  const db = client.db("Assign1B");

  server.get("/articles", (req, res) => {
    db.collection("Articles").find().toArray(function(err, result) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(result);
      }
    });
  });
}).catch(error => console.log(error));


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
