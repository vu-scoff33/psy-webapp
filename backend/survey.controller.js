const { Survey } = require("../models/Survey");

//TODO: refator to only return js objects, and let the route determine, to render or to json. (a single view may request multiple source of data)

exports.admin_get_all_surveys = async function (req, res) {
  var results = await Survey.find().select("name isPublished");
  res.render("admin", {
    surveys: results,
  });
};

exports.admin_get_survey = async function (req, res) {
  const surveyId = req.params.id;
};
exports.admin_delete_survey_api = async function (req, res) {
  surveyId = req.params.id;
  const d = await Survey.deleteOne({
    _id: surveyId,
  });
  if (d.deletedCount) res.status(200);
  else res.status(204);
  res.end();
};

exports.admin_create_survey_api = async function (req, res) {
  const { name } = req.body;
  const doc = new Survey({
    name: name,
  });
  await doc.save();
  res.status(200).end();
};

exports.update_survey_api = async function (req, res) {};

//TODO: manually throw error & see how to handle it
