
// require("dotenv").config();
const mongoose = require("mongoose");

const connectMongoDB = () => {
  try {
    mongoose.connect("mongodb+srv://skillconnect:skillconnect@skillconnect.pzkbm.mongodb.net/QnA?retryWrites=true&w=majority", {
      // mongoose.connect(MONGO_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to Database 🌱"));
    // db.once("open", () => console.log("Connected to Database 🌱" + MONGO_URL));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
connectMongoDB();
module.exports = { connectMongoDB };




// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://skillConnect:skillConnect@cluster0.pzkbm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
