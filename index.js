const express = require("express");
const route = require("./controller/controller")
const mongoose = require("mongoose");
const app = express();

mongoose.set('strictQuery', true)
mongoose
  .connect(
    "mongodb+srv://singh-csm:GIUPM5681K@singh-csm.nmfw5jk.mongodb.net/crypto",
    { UseNewUrlParser: true }
  )
  .then(() => console.log("Your Mongo-Db is connected"))
  .catch((err) => console.log(err.message));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("listening at port " + (process.env.PORT || 3000));
});