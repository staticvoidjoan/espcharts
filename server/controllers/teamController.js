const Team = require("../models/teamModel");
const { getNames } = require("country-list");
const validCountries = getNames();

module.exports.createTeam = async (req, res) => {
  try {
    const { teamOrigin, teamName } = req.body;

    //Check if the Team Name is of the correct format
    const nameRegex = /^[a-zA-Z0-9 _-]+$/
    ;
    if (!nameRegex.test(teamName)) {
      return res
        .status(400)
        .json({ message: "Invalid team name please use the correct format" });
    }

    //Check if the country is an actual country
    if (!validCountries.includes(teamOrigin)) {
      return res
        .status(400)
        .json({ message: teamOrigin + "is not a valid country" });
    }

    //Check if there already is a team with that name
    const existingTeam = await Team.findOne({teamName})
    if (existingTeam) {
          return res
          .status(400)
          .json({ message: "A team with that name already exists" });
        }

    //If everything is correct create the team
    const team = await Team.create(req.body);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function that gets all teams
module.exports.getTeams = async (req, res) => {
  try {
    const {page,limit} = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const teams = await Team.find().skip(skip).limit(limit);

    //Check if the database is empty
    if (teams.length == 0) {
      return res
        .status(200)
        .json({ message: "Error there is no teams in the database" });
    }
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find({});

    //Check if the database is empty
    if (teams.length == 0) {
      return res
        .status(200)
        .json({ message: "Error there is no teams in the database" });
    }
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function that updates the team
module.exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    if (!team) {
      res.status(404).json({ message: "There is no team with that Id" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function that gets a team by id
module.exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamName, teamOrigin } = req.body;

    //Check if the new team name is in the correct format
    const nameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!nameRegex.test(teamName)) {
      res.status(400).json({ message: "Invalid team name" });
    }

    //Check if the new country is an actual country
    // if (!validCountries.includes(teamOrigin)) {
    //   return res
    //     .status(400)
    //     .json({ message: teamOrigin + "is not a valid country" });
    // }
    //Get the team we want to update
    const selectedTeam = await Team.findById(id);
    //Check if the team already exists if not send 404 status
    if (!selectedTeam) {
      res.status(404).json({ message: "There is no team with that Id" });
    }

    //Check if there already is a team with the name we want to use 
    const existingTeam = await Team.findOne({
      _id: { $ne: id },
      $or: [{ teamName }],
    });

    if (existingTeam && existingTeam.teamName === teamName) {
      return res
        .status(400)
        .json({
          message:
            "The name " +
            teamName +
            " already exists for another team please use another one ",
        });
    }

    //If all the validations are good we update the team
    const team = await Team.findByIdAndUpdate(id, req.body);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//Function to delete a team
module.exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      res.status(404).json({ message: "There is no team with that Id" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
