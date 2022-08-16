const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const initialize = require("./models/intialize");
const { auth_guard, login_api } = require("./backend/auth");
const { admin_get_all_surveys, admin_create_survey_api } = require("./backend/survey.controller");

//configurations & third-party middleware
const app = express();
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true, //?
  })
);
app.use(cookieParser());
//

app.use(express.static("static"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/static/login.html");
});
app.post("/login", login_api);

//api
app.get("/admin", auth_guard, admin_get_all_surveys);
app.post("/admin/create-survey", auth_guard, admin_create_survey_api);

//Database
const connectDB = async function () {
  const mongoDB_url =
    "mongodb+srv://admin:Axse3078CdEzV52J@cluster0.kkqe9.mongodb.net/?retryWrites=true&w=majority";
  await mongoose.connect(mongoDB_url);
  initialize().catch("Failed to initialize data");
};
connectDB().catch((e) => console.log("Failed to connect to db", e));

var server = app.listen(process.env.PORT || 4000, () => {
  console.log(`App listening on port ${server.address().port}`);
});
