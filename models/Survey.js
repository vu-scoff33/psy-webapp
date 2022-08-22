const mongoose = require("mongoose");

const surveyQuestionEnum = ["text", "mcq", "canvas"];

//TODO: question & answer structures
const responseSchema = new mongoose.Schema(
  {
    studentId: String,
    answers: [
      {
        answerType: {
          type: String,
          required: true,
          enum: surveyQuestionEnum,
        },
        text: String,
        selectedOptions: [mongoose.Schema({
          idx: Number, 
          option: String
        })],
        image: Buffer,
      },
    ],
    timeCompleted: Date,
  },
  {
    timestamps: true,
  }
);

const surveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  questions: [
    mongoose.Schema({
      questionType: {
        type: String,
        required: true,
        enum: surveyQuestionEnum,
      },
      title: String,
      options: [String],
      image: Buffer,
    }),
  ],
  responses: [responseSchema],
});

const Response = mongoose.model("Response", responseSchema);
const Survey = mongoose.model("Survey", surveySchema);
module.exports = {
  surveyQuestionEnum,
  Response,
  Survey,
};
