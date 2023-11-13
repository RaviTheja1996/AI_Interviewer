const mongoose = require("mongoose");

// const interviewSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   type: { type: String, enum: ["react", "mern", "nem"], required: true },
//   conversations: [
//     {
//       question: { type: String, required: true },
//       userResponse: { type: String },
//       feedback: {
//         strengths: [{ type: String }],
//         improvements: [{ type: String }],
//       },
//     },
//   ],
//   createdAt: { type: Date, default: Date.now },
// });

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["javascript", "react", "node", "fullstack"],
      required: true,
    },
    chatHistory: {
      type: Array,
      required: true,
    },
    communication: {
      type: Number,
      default: 0,
    },
    subjectExpertise: {
      type: Number,
      default: 0,
    },
    hiringCriteria: {
      type: String,
      enum: ["No Hire", "Hire", "Strong Hire"],
    },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);

const InterviewModel = mongoose.model("Interview", interviewSchema);

module.exports = { InterviewModel };
