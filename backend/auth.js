const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.login = async function(req, res){
  const {username, password} = req.body
  const user = await User.exists({username: username, password: password})
  if (!user){
    res.status(401).end();
  }
  else {
    const token = jwt.sign({username},process.env.JWT_SECRET_KEY)
    res.cookie("jwt-token", token, {
      httpOnly: true,
      secure: true
    })
    .send() //TODO: RENDER MAIN PAGE
  }
}