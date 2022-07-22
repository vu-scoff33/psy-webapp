const mongoose = require('mongoose')

const surveyQuestionEnum = ['text', 'mcq', 'image']

const responseSchema = new mongoose.Schema({
  studentId: String,
  answers: [
    {
      answerType: {
        type: String, 
        required: true,
        enum: surveyQuestionEnum
      }, 
      data: String,
      image: Buffer,
    }
  ]
}, {
  timestamps: true
})

const surveySchema = new mongoose.Schema({
  questions: [{
    questionType: {
      type: String, 
      required: true, 
      enum: surveyQuestionEnum
    }, 
    data: String, 
    image: Buffer
  }], 
  responses: [responseSchema]
})


const Response = mongoose.model("Response", responseSchema)
const Survey = mongoose.model("Survey", surveySchema)
module.exports = {
  surveyQuestionEnum, 
  Response, 
  Survey
}

