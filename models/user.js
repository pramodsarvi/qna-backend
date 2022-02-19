const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    skill: {
      type: String     
    },
    description: {
      type: String 
    },
    email: {
      type: String
    },
    github: {
      type: String,
      
    },
    instagram: {
      type: String
    },
    website:{
      type:String
    },
    username:{
      type:String,
      required:true
    },    
    password:{
      type:String,
      required:true
    },
        
    refresh_token:{
      type:String,
      required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
