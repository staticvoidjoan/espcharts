const playerController = require("../controllers/playerController");

module.exports = function (app) {
    app.post("/espcharts/player",playerController.createPlayer);
    app.get("/espcharts/player",playerController.getPlayers);
    app.get("/espcharts/player/:id",playerController.getPlayerById);
    app.put("/espcharts/player/:id",playerController.updatePlayer);
    app.delete("/espcharts/player:/id",playerController.deletePlayer);
}