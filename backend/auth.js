const jwt = require("jsonwebtoken");
const path = require("path");
const { dirname } = require("path");
const User = require("../models/User");

exports.login_api = async function (req, res) {
  const { username, password } = req.body;
  const user = await User.exists({ username: username, password: password });
  if (!user) {
    res.status(401).end();
  } else {
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
    res
      .cookie("jwt_token", token, {
        httpOnly: true,
        secure: true,
      })
      .end(); //TODO: RENDER MAIN PAGE
  }
};

exports.auth_guard = function (req, res, next) {
  const token = req.cookies.jwt_token;
  if (!token) {
    return res.redirect("/login");
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    }
    next();
  });
};
