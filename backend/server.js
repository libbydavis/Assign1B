const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
