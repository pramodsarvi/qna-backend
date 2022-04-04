const mongoose = require("mongoose");

var uuid = require('node-uuid');
// const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    userid:{
      type:String,
      default:uuid.v1,
    },
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
    password:{
      type:String,
      required:true
    },
        
    refresh_token:{
      type:String,
      required:false
    },
    last_log:{
      type:Date,
      default:Date.now(),
      required:false
    },
    otp:{
      type:String,
      default:0,
      required:false
    },
    profile_pic:{
      type:String,
      default:'https://bootdey.com/img/Content/avatar/avatar7.png',
      required:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
