const tournamentController = require("../controllers/tournamentController");

//Routes for the tournament controller
module.exports = function (app) {
  app.post("/espcharts/tournament",tournamentController.createTournament);
  app.get("/espcharts/tournament",tournamentController.getAllTournaments);
  app.get("/espcharts/tournament/:id",tournamentController.getTournamentById);
  app.put("/espcharts/tournament/:id",tournamentController.updateTournament);
  app.delete("/espcharts/tournament/:id",tournamentController.deleteTournament);
};
