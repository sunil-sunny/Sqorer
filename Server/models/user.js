const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  googleId:{
    type: String,
  },
  firstname:{
    type: String,
    require: true
  },
  lastname:{
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  userType: {
    type: String,
  },
  isOnline: { 
      type: Boolean,
      default: false
  },
  lastLogin: {
      type: Date,
  },
  isPremium: {
      type: Boolean,
      default: false
  },
  lastDatePaid: {
    type: Date
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country:{
    type: String,
  },
  zipCode: {
    type: String,
  },
  phone: {
    type: String,
  },
  profile: {
    type: String,
  },
  title: {
    type: String
  }
});

module.exports = User = mongoose.model("user", userSchema);