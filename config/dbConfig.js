const mongoose = require("mongoose");
const uri = "mongodb+srv://shametijoan:mafia2001@staticvoidjoan.duwyxmk.mongodb.net/espcharts?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    
    console.log("Connected to Mongodb");
  })
  .catch((error) => {
    console.log(error);
  });
