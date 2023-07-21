const mongoose = require("mongoose");
const uri = "enter your uri";

mongoose
  .connect(uri)
  .then(() => {
    
    console.log("Connected to Mongodb");
  })
  .catch((error) => {
    console.log(error);
  });
