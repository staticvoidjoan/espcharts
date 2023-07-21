const Team = require("../models/teamModel");

module.exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find({});
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

module.exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(id);
    if (!team) {
      res.status(404).json({ message: "There is no team with that Id" });
    }
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
  
