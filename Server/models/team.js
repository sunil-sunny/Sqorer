const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    name: {
        type: String,
    },
    profile: {
        type: String
    },
    members: [
        {
            email: {
                type: String
            }
        }
    ]
});

module.exports = Team = mongoose.model("team", teamSchema);