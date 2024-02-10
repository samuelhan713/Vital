const express = require("express");
const questions = require("../controllers/question.js");

const router = express.Router();

// GET ALL QUESTIONS
router.get("", questions.getAllQuestions);

// GET QUESTIONS BY USERID
router.get("/myQuestions/:userId", questions.getMyQuestions);

// GET A QUESTION BY USERID
router.get("/myQuestion/:userId", questions.getMyQuestion);

// CREATE A QUESTION
router.post("/createQuestion", questions.createQuestion);

// DELETE A QUESTION
router.delete("/deleteQuestion/:questionId", questions.deleteQuestion);

module.exports = router