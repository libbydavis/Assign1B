const express = require("express");
const PORT = process.env.PORT || 8082;
const connectDB = require("./db");
const getUsers = require("./db");
const cors = require("cors");
const {ObjectId} = require("mongodb");

const server = express();

//const dbConnect = dbo.getDb();
require("dotenv").config();
const connectionString = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(connectionString)
  .then((client) => {
    console.log("Connected to database");
    const db = client.db("Assign1B");

      server.post("/submitArticle", (req, res) => {
          const query = { userID: ObjectId(req.query.userID) };
          const update = { $push: {submittedArticles: req.body}};
          const options = { upsert: true };
          db.collection("SubmittedArticles").updateOne(query, update, options).then(() => {
                  res.status(200);
                  res.send();
              }
          ).catch(err => {
              res.status(409);
              res.send(err);
          });
      });

    server.get("/articles", (req, res) => {
      db.collection("Articles")
        .find()
        .toArray(function (err, result) {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        });
    });


      server.get("/viewSubmissions", (req, res) => {
          db.collection("SubmittedArticles")
              .find({userID: ObjectId(req.query.userID)})
        .toArray(function (err, result) {
                  if (err) {
                      console.log(err);
                  } else {
                    console.log(result);
                      res.json(result);
                  }
              });
        
      server.get("/pendingArticles", (req, res) => {
          db.collection("SubmittedArticles")
              .find()
              .toArray(function (err, result) {
                  if (err) {
                      console.log(err);
                  } else {
                    res.json(result);
                  }
              });


    server.post("/login", (req, res) => {
      db.collection("Users")
        .find()
        .toArray(function (err, result) {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        });
    });

  })
  .catch((error) => console.log(error));

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  console.log("API is running");
  res.send("API is running!");
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
