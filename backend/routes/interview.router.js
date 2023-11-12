const express = require("express");
const { openaiFunction } = require("../controller/openai.controller");
const {authMiddleware} = requrie("../middleware/auth.middleware");

const AI_Interviewer_Router = express.Router();

AI_Interviewer_Router.post("/query", authMiddleware, openaiFunction);

module.exports = { AI_Interviewer_Router };