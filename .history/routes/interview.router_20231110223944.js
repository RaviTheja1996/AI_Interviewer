const express = require("express");
const { openaiFunction } = require("../controller/openai.controller");

const AI_Interviewer_Router = express.Router();

AI_Interviewer_Router.post("/query", openaiFunction);

module.exports = { AI_Interviewer_Router };