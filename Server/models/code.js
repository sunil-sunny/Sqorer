const mongoose = require("mongoose");

const codeSchema = mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  code: {
      type: Number, 
      require: true
  },
  isExpired: {
      type: Boolean,
      default: false
  },
  createdAt:{
      type: Date,
      default: Date.now()
  }
});

module.exports = Code = mongoose.model("code", codeSchema);