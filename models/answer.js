const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answer = new Schema(
  {
    answer: {
      type: String,
      required: true,
    },
    user_id: {
      type: String     
    },
    time: {
      type: Date,
      default:Date.now()
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("answer", answer);
