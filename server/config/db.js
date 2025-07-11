const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const connc = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected", connc.connection.host);
  } catch (err) {
    console.log(err.message, "MongoDB Connection Failed");
    process.exit(1);
  }
};

module.exports = connectDB;
