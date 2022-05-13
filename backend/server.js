const express = require("express");
const PORT = process.env.PORT || 5000;
const connectDB = require('./db');
const cors = require('cors');

const server = express();

connectDB().then(r => console.log("connected to DB"));

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, () => console.log(`listening on port ${PORT}`));



