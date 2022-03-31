var uuid = require('node-uuid');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    projectid:{
      type:String,
      default:uuid.v1,
    },
    title: {
      type: String,
      required: true,
    },
    github: {
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
