const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
    min: 1,
    max: 10
  },
  age: {
    type: Boolean,
    required: true
  },
  allergies: {
    type: String,
    required: true,
    min: 2,
    max: 100
  },
  description: {
    type: String,
    min: 5,
    max: 1000
  },
  user_id: {
    type: String,
    required: true,
  },
});
const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;