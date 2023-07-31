const Match = require("../models/matchModel");

//Function to create a new Match
module.exports.createMatch = async (req, res) => {
  try {
    const { tournament, team1, team2, playedMaps } = req.body;

    //Check if the map names are correct
    const regex = /^[A-Za-z0-9]+$/;
    if (!playedMaps.every((map) => regex.test(map))) {
      res
        .status(400)
        .json({ message: "Map name is not in the correct format" });
      return; // Return early if any map name is incorrect
    }

    //Check if the match already exists, if not, return an error message
    const existingMatch = await Match.findOne({ tournament, team1, team2 });
    if (existingMatch) {
      res.status(400).json({ message: "Match already exists" });
      return; // Return early if the match already exists
    }

    const match = await Match.create(req.body);
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function to get all matches
module.exports.getMatches = async (req, res) => {
  try {
    const match = await Match.find({});
    // if (match.length == 0) {
    //   res
    //     .status(404)
    //     .json({ message: "There is no match added to the database" });
    // }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function to get a match by its id
module.exports.getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id);
    if (!match) {
      res.status(404).json({ message: "There is no match with that id" });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function to update a match
module.exports.updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { tournament, team1, team2, playedMaps } = req.body;

    //Check if the map names are correct
    const regex = /^[A-Za-z0-9]+$/;
    if (regex.test(playedMaps)) {
      res
        .status(400)
        .json({ message: "Map name is not in the correct format" });
    }

    const selectedMatch = await Match.findById(id);
    if (!selectedMatch) {
      res.status(404).json({ message: "There is no match with that id" });
    }

    //Check if the match alreadt
    const existingMatch = await Match.findOne({
      _id: { $ne: id },
      $or: [({ tournament }, { team1 }, { team2 })],
    });
    if (
      existingMatch.tournament == tournament &&
      existingMatch.team1 == team1 &&
      existingMatch.team2 == team2
    ) {
      res.status(400).json({ message: "Match already exists" });
    }

    const match = await Match.findByIdAndUpdate(id, req.body);
    if (!match) {
      res.status(404).json({ message: "There is no match with that id" });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function to delete a match
module.exports.deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findByIdAndDelete(id);
    if (!match) {
      res.status(404).json({ message: "There is no match with that id" });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
