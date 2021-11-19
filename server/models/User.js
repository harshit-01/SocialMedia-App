const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username:{
      type: String,
      required: true,
      min:3,
      max:20,
      unique: true
  },
  email:{
    type: String,
    required: true,
    max:50,
    unique: true
  },
  password:{
    type: String,
    required: true,
    min:6
  },
  profilePicture: {
      type:String,
      default:""
  },
  coverPicture: {
    type:String,
    default:""
  },
  followers:{
      type:Array, // followers linked to id
      default:[]
  },
  followings:{
    type:Array, // followers linked to id
    default:[]
  },
  isAdmin:{
      type:Boolean,
      default:false
  },
  desc:{
    type:String,
    max:50
  },
  city:{
    type:String,
    max:50
  },
  from:{
    type:String,
    max:50
  },
  relationship:{
    type:Number,
    enum:[1,2,3]
  }

},{timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;
