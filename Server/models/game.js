const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  code: {
      type: String,
      require: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      unique: true
    }
  ],
  topic:{
    type: String,
    require: true
  },
  pattern:{
    type: String,
    require: true
  },
  isCustomPattern: {
    type: Boolean,
    require: false
  },
  intervale:{
    to: {type: Number},
    from: {type: Number}
  },
  numbers:{
    type: Number,
    require: true
  },
  mode: {
    type: String,
    require: true
  },
  round: {
    type: Number,
  },
  secondPerRound: {
    type: Number,
  },
  question: {
    type: Number,
  },
  duration: {
    type: Number
  },
  expireOn: {
    type:Date
  },
  startAt:{
    type: Date
  },
  status: {
    type: String,
    default: "Pending"
  }, 
  positiveMark: {
    type: Number,
    required: true
  },
  negativeMark: {
    type: Number,
    required: true
  },
  currentRound: {
    type: Number,
    default: 1
  },
  subTopic:[
    {
      name: {
        type: String
      },
      options:[
        {
          option:{
            type: String
          }
        }
      ]
    }
  ]
});

module.exports = Game = mongoose.model("game", gameSchema);