const contactController = require("../controllers/contactController")

module.exports = function (app) {
    app.post("/espcharts/contact",contactController.createContact)
    app.get("/espcharts/contact",contactController.getContact)
    app.get("/espcharts/contact/:id",contactController.getContactById)
    app.put("/espcharts/contact/:id",contactController.updateContact)
    app.delete("/espcharts/contact/:id",contactController.deleteContact)

}