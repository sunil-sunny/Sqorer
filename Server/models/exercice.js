const mongoose = require("mongoose");

const exerciceSchema = mongoose.Schema({
  game:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "game",
  },
  topic:{
      type:String,
      require: true
  },
  numbers:[
    {
      type: String,
      require: true
    }
  ],
  isResolved: {
    type: Boolean,
    default: false
  },
  currentRound:{
    type: Number,
    default: 1
  },
  answer:{
    type: Number,
    required: true
  },
  player:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }
});

module.exports = Exercice = mongoose.model("exercice", exerciceSchema);