const { Survey } = require("../models/Survey");

exports.admin_get_all_surveys_api = async function (req, res) {
  const results = await Survey.find().select('name');
  res.json(results);
};

exports.admin_get_survey_api = async function(req,res){
  
}

exports.add_survey_api = async function(req, res) {
  const {name, questions} = req.body;
  console.log(name, questions);
  const doc = new Survey({
    name: name, 
    questions: questions
  });
  await doc.save();
  res.end();
}

//TODO: manually throw error & see how to handle it
