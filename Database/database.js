
// require("dotenv").config();
const mongoose = require("mongoose");

const connectMongoDB = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/qna-db", {
      // mongoose.connect(MONGO_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    });
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to Database 🌱" + "mongodb://localhost:27017/QnA"));
    // db.once("open", () => console.log("Connected to Database 🌱" + MONGO_URL));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
connectMongoDB();
module.exports = { connectMongoDB };