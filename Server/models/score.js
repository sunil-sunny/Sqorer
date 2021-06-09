const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
    round: {
        type: Number,
        default: 0
    },
    turns:[
        {
            index: {
                type: Number,
                require: true
            },
            question:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "exercice",
            },
            answer :{
                type:String,
                require: true
            },
            isCorrect: {
                type:Boolean,
                require: false
            }
        }
    ]
});

module.exports = score = mongoose.model("score", scoreSchema);