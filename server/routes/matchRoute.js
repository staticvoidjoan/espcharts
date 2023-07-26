const matchController = require("../controllers/matchController");

//Routes for the match controller
module.exports = function (app) {
  app.post("/espcharts/match", matchController.createMatch);
  app.get("/espcharts/match", matchController.getMatches);
  app.get("/espcharts/match/:id", matchController.getMatchById);
  app.put("/espcharts/match/:id", matchController.updateMatch);
  app.delete("/espcharts/match/:id", matchController.deleteMatch);
};
