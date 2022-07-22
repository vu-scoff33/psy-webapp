const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const initialize = require("./models/intialize");


const app = express();
app.set("view engine", "pug")

app.use(express.static("static"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/static/login.html");
});
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/static/admin.html");
});


//Database
const connectDB = async function(){
  const mongoDB_url = "mongodb+srv://admin:Axse3078CdEzV52J@cluster0.kkqe9.mongodb.net/?retryWrites=true&w=majority"
  await mongoose.connect(mongoDB_url)
  initialize().catch("Failed to initialize data")
}
connectDB().catch(e => console.log("Failed to connect to db",e))

var server = app.listen(process.env.PORT || 4000, () => {
  console.log(`App listening on port ${server.address().port}`)
});
