const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    response_id: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHERS"],
      required: true,
    },
    project_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,  
    },
    time: {
      type: String     
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
