const express = require("express");
const PORT = process.env.PORT || 8082;
const cors = require("cors");
const { ObjectId } = require("mongodb");
const path = require("path");
const server = express();

require("dotenv").config();
const connectionString = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(connectionString)
  .then((client) => {
    console.log("Connected to database");
    const db = client.db("Assign1B");

    server.post("/api/submitArticle", (req, res) => {
      const query = { userID: ObjectId(req.query.userID) };
      const update = { $push: { submittedArticles: req.body } };
      const options = { upsert: true };
      db.collection("SubmittedArticles")
        .updateOne(query, update, options)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch((err) => {
          res.status(409);
          res.send(err);
        });
    });

    server.get("/api/articles", (req, res) => {
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

    server.get("/api/viewSubmissions", (req, res) => {
      if (req.query.userID) {
        db.collection("SubmittedArticles")
          .find({ userID: ObjectId(req.query.userID) })
          .toArray(function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
              res.json(result);
            }
          });
      } else {
        db.collection("SubmittedArticles")
          .find()
          .toArray(function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
              res.json(result);
            }
          });
      }
    });

    server.get("/api/viewModerated", (req, res) => {
      db.collection("ModeratedArticles")
        .find()
        .toArray(function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            res.json(result);
          }
        });
    });

    // Adds article to moderated articles
    server.post("/api/approveArticle", (req, res) => {
      const query = { userID: ObjectId(req.query.userID) };
      const update = { $push: { moderatedArticles: req.body } };
      const options = { upsert: true };
      db.collection("ModeratedArticles")
        .updateOne(query, update, options)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch((err) => {
          res.status(409);
          res.send(err);
        });
    });

    // Adds article to analysed articles
    server.post("/api/analyseArticle", (req, res) => {
      db.collection("Articles")
        .insertOne(req.body)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch((err) => console.log(err));
    });

    // Adds article to removed articles
    server.post("/api/removeArticle", (req, res) => {
      const query = { userID: ObjectId(req.query.userID) };
      const update = { $push: { removedArticles: req.body } };
      const options = { upsert: true };
      db.collection("RemovedArticles")
        .updateOne(query, update, options)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch((err) => {
          res.status(409);
          res.send(err);
        });
    });

    // Removes article from submitted articles
    server.post("/api/deleteSubmittedArticle", (req, res) => {
      const query = { userID: ObjectId(req.query.userID) };
      const update = {
        $pull: { submittedArticles: { title: req.query.title } },
      };
      const options = { upsert: false };

      db.collection("SubmittedArticles")
        .updateOne(query, update, options)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch((err) => {
          res.status(409);
          res.send(err);
        });
    });

    // Removes article from submitted articles
    server.post("/api/deleteModeratedArticle", (req, res) => {
      const query = { userID: ObjectId(req.query.userID) };
      const update = {
        $pull: { moderatedArticles: { title: req.query.title } },
      };
      const options = { upsert: false };

      db.collection("ModeratedArticles")
        .updateOne(query, update, options)
        .then(() => {
          res.status(200);
          res.send();
        })
        .catch((err) => {
          res.status(409);
          res.send(err);
        });
    });

    server.post("/api/login", (req, res) => {
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

// This will create a middleware.
// When you navigate to the root page, it would use the built react-app
server.use(express.static(path.resolve(__dirname, "./frontend/build")));
server.use(express.static(path.join(__dirname, 'frontend', 'build')));

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
