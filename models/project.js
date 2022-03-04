const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    title: {
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
      type: Date,
      default:Date.now(),
      required:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
