const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    // FIX: Changed from MONGO_url to MONGO_URL (env var is uppercase)
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB Database ${mongoose.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`MongoDB Database Error ${error}`.bgRed.white);
    process.exit(1); // Exit on connection failure
  }
};

module.exports = connectDB;
