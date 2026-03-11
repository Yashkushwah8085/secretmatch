import mongoose from "mongoose";

const ProfileSchema = mongoose.Schema({
 

  name:{
    type:String,
    required:true
  },

  age:{
    type:Number,
    required:true
  },

  gender:{
    type:String,
    enum:["male","female","other"],
    required:true
  },

  interestedIn:{
    type:String,
  
  },

  bio:{
    type:String,
    maxlength:300
  },

  location:{
    type:String
  },

  photos:[String],

  createdAt:{
    type:Date,
    default:Date.now
  }

})

const ProfileModel = mongoose.model("Profile",ProfileSchema)

export default ProfileModel;