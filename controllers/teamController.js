const Team = require("../models/teamModel");
const { getNames } = require("country-list");
const Tournament = require("../models/tournamentModel");
const validCountries = getNames();

module.exports.createTeam = async (req, res) => {
  try {
    const { teamOrigin, teamName } = req.body;

    //Check if the Team Name is of the correct format
    const nameRegex = /^[a-zA-Z0-9_-]+$/;
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
module.exports.updateTeam = async (req, res) => {
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
module.exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamName } = req.body;

    //Check if the new team name is in the correct format
    const nameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!nameRegex.test(teamName)) {
      return res
        .status(400)
        .json({ message: "Invalid team name please use the correct format" });
    }

    const selectedTeam = await Team.findById(id);
    //Check if the team we selected exists in the database
    if (!selectedTeam) {
      return res
        .status(404)
        .json({ message: "Error there is no Team with that Id" });
    }

    //Compares the name we wanna update
    const existingTeam = await Tournament.findOne({
      _id: { $ne: id },
      $or: [{ teamName }],
    });
    if (existingTeam.teamName == teamName) {
      return res
        .status(400)
        .json({ message: "A team with that name exists already" });
    }

    //If all the validations are good we update the team
    const team = await Team.findByIdAndUpdate(id);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
