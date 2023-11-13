const express = require("express");
const {
  jsInterview,
  jsInterviewPost,
  jsInterviewPatch,
} = require("../controller/openai.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const AI_Interviewer_Router = express.Router();
AI_Interviewer_Router.use(authMiddleware);

// routes
AI_Interviewer_Router.post("/javascript", jsInterviewPost);
// AI_Interviewer_Router.post("/react", reactInterview);
// AI_Interviewer_Router.post("/node", nodeInterview);
// AI_Interviewer_Router.post("/fullstack", fullstackInterview);

// patch routes
AI_Interviewer_Router.patch("/javascript", jsInterviewPatch);
// AI_Interviewer_Router.patch("/react", reactInterview);
// AI_Interviewer_Router.patch("/node", nodeInterview);
// AI_Interviewer_Router.patch("/fullstack", fullstackInterview);

module.exports = { AI_Interviewer_Router };
