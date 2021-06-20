const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    teacherId: {
        type: String,
        require: true
    },
    members: [
        {
            email: {
                type: String,
                required: true
            }
        }
    ]
});

teamSchema.methods.toJSON = function () {
    var obj = this.toObject();
    return obj;
}

teamSchema.methods.addMember = async function (email) {
    const team = this;
    team.members = team.members.concat({email});
    await team.save();
    return email;
}

module.exports = Team = mongoose.model("team", teamSchema);