const User = require("./User")

const initialize = async function(){
  const obj = {
    username: "admin", 
    password: "admin123"
  }
  const isExisted = await User.exists(obj);
  if (!isExisted){
    const admin = new User(obj);
    await admin.save();
  }
  console.log("Default data initialized");
}

module.exports = initialize