const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    question_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    question: {
      type: String,  
    },
    date: {
      type: String     
    },
    question_description: {
      type: String 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
