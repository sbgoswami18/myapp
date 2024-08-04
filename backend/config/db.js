const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://sbgoswami2025:R3vaObKhnATKzbfD@cluster0.qi2nb2i.mongodb.net/MyApp').then(() => console.log("DB connected..."));
}

module.exports = connectDB