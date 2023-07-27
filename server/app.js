const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors")


const app = express();
app.use(cors());
// app.use(express.urlencoded());
app.use(express.json());




const routeFiles = ["./routes/tournamentRoute", "./routes/teamRoute", "./routes/playerRoute"];

routeFiles.forEach((routeFile) => {
  require(routeFile)(app);
});

const port = 5000; //Define the port that will be used
require("./config/dbConfig");
app.listen(port, () => {
  //Start the server
  console.log(
    "espCharts listeting at http://localhost:" +
      port +
      " at endpoint /espcharts"
  );
});
