const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://sachin:Abcd1234@mern.6dn4vyt.mongodb.net/urlShort"
  );
};

module.exports = connectDB;
