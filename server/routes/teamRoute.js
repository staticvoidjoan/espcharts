const teamController = require("../controllers/teamController");

//Routes for the team controller
module.exports = function (app) {
  app.post("/espcharts/team", teamController.createTeam);
  app.get("/espcharts/team", teamController.getTeams);
  app.get("/espcharts/team/:id", teamController.getTeamById);
  app.put("/espcharts/team/:id", teamController.updateTeam);
  app.delete("/espcharts/team/:id", teamController.deleteTeam);
};
