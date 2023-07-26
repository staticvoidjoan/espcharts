const Tournament = require("../models/tournamentModel");

//Function that creates a new tournament
module.exports.createTournament = async (req, res) => {
  try {
    //Get the requested from the body
    const { tournamentName, location, organizer, startDate, gameTitle } =
      req.body;

    //Check if name formats are correct
    const regexOne = /^[a-zA-Z0-9_-]+$/;
    if (!regexOne.test(tournamentName)) {
      res.status(400).json({ message: "Invalid tournament name" });
    }
    const regexTwo = /^[A-Za-z]+$/;
    if (!regexTwo.test(location) || !regexTwo.test(organizer)) {
      res.status(400).json({ message: "Invalid characters" });
    }

    //Check if there is already a tournament with the same name, start date, and gameTitle
    const existingTournament = await Tournament.findOne({
      tournamentName,
      startDate,
      gameTitle,
      location,
    });
    if (existingTournament) {
      return res.status(500).json({ message: "Tournament already exists" });
    }

    //If everything is validated create the tournament and add it to the database
    const tournament = await Tournament.create(req.body);
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function that gets all the tournaments
module.exports.getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({})
      .populate("participatingTeams")
      .select("-__v");

    //Check if the database is empty
    if (tournaments.length == 0) {
      return res
        .status(404)
        .json({ message: "There are no tournaments added in the database" });
    }
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function that gets a tournament by id
module.exports.getTournamentById = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findById(id);
    //Check if there is a tournament with that id
    if (!tournament) {
      return res
        .status(404)
        .json({ message: "Error there is no Tournament with that Id" });
    }
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function that updates a tournament
module.exports.updateTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const { tournamentName, location, organizer, startDate, gameTitle } =
      req.body;

    //Make the format checks
    const regexOne = /^[a-zA-Z0-9_-]+$/;
    const regexTwo = /^[A-Za-z]+$/;
    if (!regexOne.test(tournamentName)) {
      res.status(400).json({ message: "Invalid tournament name" });
    }
    if (!regexTwo.test(location) || !regexTwo.test(organizer)) {
      res.status(400).json({ message: "Invalid characters" });
    }

    //Get the tournament we want to update and compare and see if the things we want to update
    //exist on any other tournaments
    const selectedTournament = await Tournament.findById(id);
    //but before we countinue with the checks we see if the tournament we want to edit actually exists or not
    if (!selectedTournament) {
      return res
        .status(404)
        .json({ message: "Error there is no Tournament with that Id" });
    }
    const existingTournament = await Tournament.findOne({
      _id: { $ne: id },
      $or: [
        { tournamentName },
        { location },
        { organizer },
        { startDate },
        { gameTitle },
      ],
    });

    if (
      existingTournament.tournamentName == tournamentName &&
      existingTournament.location == location &&
      existingTournament.organizer == organizer &&
      existingTournament.startDate == startDate
    ) {
      return res.status(400).json({
        message:
          "You cant use those values a tournament with those values already exists",
      });
    }

    //If all the validations are good we update the tournament
    const tournament = await Tournament.findByIdAndUpdate(id);
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Function that deletes the tournament
module.exports.deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findByIdAndDelete(id);
    if (!tournament) {
      return res
        .status(404)
        .json({ message: "Error there is no Tournament with that Id" });
    }
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
