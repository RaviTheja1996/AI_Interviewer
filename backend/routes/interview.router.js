const express = require("express");
const {
  jsInterviewPost,
  jsInterviewPatch,
  reactInterviewPost,
  nodeInterviewPost,
  fullstackInterviewPost,
  reactInterviewPatch,
  nodeInterviewPatch,
  fullstackInterviewPatch,
  getUserInterviewData,
} = require("../controller/openai.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const AI_Interviewer_Router = express.Router();
AI_Interviewer_Router.use(authMiddleware);

// post routes
AI_Interviewer_Router.post("/javascript", jsInterviewPost);
AI_Interviewer_Router.post("/react", reactInterviewPost);
AI_Interviewer_Router.post("/node", nodeInterviewPost);
AI_Interviewer_Router.post("/fullstack", fullstackInterviewPost);

// get routes
// AI_Interviewer_Router.get("/", getUserInterviewData);

// patch routes
AI_Interviewer_Router.patch("/javascript", jsInterviewPatch);
AI_Interviewer_Router.patch("/react", reactInterviewPatch);
AI_Interviewer_Router.patch("/node", nodeInterviewPatch);
AI_Interviewer_Router.patch("/fullstack", fullstackInterviewPatch);

module.exports = { AI_Interviewer_Router };
