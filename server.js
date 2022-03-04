const express = require("express");

const app = express();

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
app.listen(process.env.PORT || 4000);
