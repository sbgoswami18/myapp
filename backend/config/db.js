const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL).then(() => console.log("DB connected..."));
}

module.exports = connectDB