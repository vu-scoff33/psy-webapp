const { Survey } = require("../models/Survey")

exports.admin_get_surveys_api = async function(req, res){
  const results = await Survey.find();
}


//TODO: manually throw error & see how to handle it