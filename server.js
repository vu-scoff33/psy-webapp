const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const initialize = require("./models/intialize");
const { auth_guard, login_api } = require("./backend/auth");
const {
  admin_get_all_surveys,
  admin_create_survey_api,
  admin_delete_survey_api,
  admin_get_survey,
  admin_update_survey_api,
  admin_publish_survey_api,
  participant_get_survey
} = require("./backend/survey.controller");

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
app.delete("/admin/delete-survey/:id", auth_guard, admin_delete_survey_api);
app.get("/admin/surveys/:id", auth_guard, admin_get_survey);
app.post("/admin/surveys/:id", auth_guard, admin_update_survey_api);
app.post("/admin/surveys/publish/:id", auth_guard, admin_publish_survey_api)


//participant section
app.get("/surveys/:id", participant_get_survey);
app.post("/surveys/:id", )

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
