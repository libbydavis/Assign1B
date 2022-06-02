// db.js
const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.MONGO_URI;

const connectDB = async (uri, callback) => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const getUsers = async () => {
  let db = mongoose.connection;

  //   try {
  //     db.collection("Assign1B").findOne({}, function (err, result) {
  //       console.log(result);
  //       db.close();
  //     });
  //   } catch (err) {
  //     console.error(err.message);
  //     process.exit(1);
  //   }
};

module.exports = connectDB;
module.exports = getUsers;
