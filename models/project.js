const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    project_id: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHERS"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,  
    },
    skills: {
      type: String     
    },
    user_id: {
      type: String 
    },
    time: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
