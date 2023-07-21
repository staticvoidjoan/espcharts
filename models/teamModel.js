const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    teamName: {
        type: String,
        required:true
    },
    teamCaptain: {
        type: String,
        required: true
    },
    players:[{
      type: mongoose.Schema.Types.ObjectId,
    }],
    teamOrigin:{
        type:String
    }
})

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;