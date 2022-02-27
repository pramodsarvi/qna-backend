const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const question = new Schema(
  {
    
    user_id: {
      type: String,
      required: true,
    },
    question: {
      type: String,  
    },
    date: {
      type: Date,
      default: Date.now()   
    },
    question_description: {
      type: String 
    },
    answers:{
      type:[String],
      required:false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("question", question);
