const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    answerID: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHERS"],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    question_ID: {
      type: String,  
    },
    user_id: {
      type: String     
    },
    time: {
      type: String 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", AnswerSchema);
