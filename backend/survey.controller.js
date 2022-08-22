const { Survey, surveyQuestionEnum } = require("../models/Survey");

//TODO: refator to only return js objects, and let the route determine, to render or to json. (a single view may request multiple source of data)
//TODO: clean up database

exports.admin_get_all_surveys = async function (req, res) {
  var results = await Survey.find().select("name isPublished");
  res.render("admin", {
    surveys: results,
  });
};

exports.admin_get_survey = async function (req, res) {
  const surveyId = req.params.id;
  var info = await Survey.findOne({ _id: surveyId }).select(
    "name isPublished questions"
  );
  res.render("edit-survey", {
    surveyInfo: info,
    questionTypesEnum: surveyQuestionEnum,
  });
};

exports.admin_delete_survey_api = async function (req, res) {
  const surveyId = req.params.id;
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

exports.admin_update_survey_api = async function (req, res) {
  const surveyId = req.params.id;
  const result = await Survey.updateOne({ _id: surveyId }, req.body);
  res.end(); //TODO: status when no exists
};

exports.admin_publish_survey_api = async function (req, res) {
  const id = req.params.id;
  const result = await Survey.updateOne(
    { _id: id },
    {
      isPublished: req.body.isPublished,
    }
  );
  res.end();
};

//TODO: validate Fields Schema & sanitize data & have a clear api
//TODO: manually throw error & see how to handle it

//participant section

exports.participant_get_survey = async function (req, res) {
  const id = req.params.id;
  var survey = await Survey.findOne({
    _id: id,
    isPublished: true
  }).select("name questions");
  if (!survey) {
    return res.status(404).end();
  }

  res.render("participant", {
    surveyInfo: survey,
  });
};


/**
 * @api {post} /survey/:id
 * @apiName participant_survey_response
 * @apiGroup Survey
 * 
 * @apiParam
 */
exports.participant_post_survey_api = async function(req, res){

}
